import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { Button, Card, Checkbox, Grid, Group, NumberInput, Text, Modal, Select } from "@mantine/core";
import { DatePickerInput } from '@mantine/dates';
import { useState } from "react";
import { useAddBulkSelectDateTimeMutation, useLazyGetAllSelectDateTimeQuery, useDeleteSelectDateTimeMutation } from "../../services/selectDateTimeServiceApi";
import { IconTrash } from "@tabler/icons-react";

// Интерфейс для значений формы
interface FormValues {
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  interval: number;
  limits: number;
  includeMorning: boolean;
  includeAfternoon: boolean;
  includeEvening: boolean;
}

// Интерфейс для формы удаления
interface DeleteFormValues {
  startDate: Date | null;
  endDate: Date | null;
}

export const BulkAddSelectDateTime = () => {
  const { succeed, error } = useNotification();
  const [addBulkSelectDateTime, { isLoading }] = useAddBulkSelectDateTimeMutation();
  const [deleteSelectDateTime] = useDeleteSelectDateTimeMutation();
  const [triggerAllSelectDateTimeQuery] = useLazyGetAllSelectDateTimeQuery();
  const [previewCount, setPreviewCount] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletingDates, setIsDeletingDates] = useState(false);
  
  const form = useForm<FormValues>({
    initialValues: {
      startDate: null,
      endDate: null,
      startTime: "07:00 AM",
      endTime: "08:00 PM",
      interval: 60,
      limits: 3,
      includeMorning: true,
      includeAfternoon: true, 
      includeEvening: true,
    },
    validate: {
      startDate: (value) => (!value ? "Начальная дата обязательна" : null),
      endDate: (value) => (!value ? "Конечная дата обязательна" : null),
      startTime: (value) => (!value ? "Начальное время обязательно" : null),
      endTime: (value) => (!value ? "Конечное время обязательно" : null),
      interval: (value) => (!value || value < 15 ? "Интервал должен быть не менее 15 минут" : null),
      limits: (value) => (!value || value < 1 ? "Лимит должен быть не менее 1" : null),
    }
  });

  const deleteForm = useForm<DeleteFormValues>({
    initialValues: {
      startDate: null,
      endDate: null,
    },
    validate: {
      startDate: (value) => (!value ? "Начальная дата обязательна" : null),
      endDate: (value) => (!value ? "Конечная дата обязательна" : null),
    }
  });

  // Конвертация в 12-часовой формат
  const to12HourFormat = (hour24: number): string => {
    if (hour24 === 0) return "12:00 AM";
    if (hour24 === 12) return "12:00 PM";
    
    const suffix = hour24 < 12 ? "AM" : "PM";
    const hour12 = hour24 <= 12 ? hour24 : hour24 - 12;
    
    return `${hour12}:00 ${suffix}`;
  };

  // Преобразование из 12-часового в 24-часовой формат
  const to24HourFormat = (time12h: string): number => {
    const [timePart, ampm] = time12h.split(' ');
    let [hours] = timePart.split(':').map(Number);
    
    if (ampm === 'PM' && hours < 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours;
  };

  // Расчет примерного количества временных слотов
  const calculatePreview = (values: Partial<FormValues>) => {
    if (!values.startDate || !values.endDate) return;
    
    const start = new Date(values.startDate);
    const end = new Date(values.endDate);
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const startHour = to24HourFormat(values.startTime || "7:00 AM");
    const endHour = to24HourFormat(values.endTime || "8:00 PM");
    const hoursPerDay = endHour - startHour;
    const slotsPerDay = Math.floor((hoursPerDay * 60) / (values.interval || 60));
    
    const periodCount = (values.includeMorning ? 1 : 0) + 
                        (values.includeAfternoon ? 1 : 0) + 
                        (values.includeEvening ? 1 : 0);
    
    if (periodCount === 0) return setPreviewCount(0);
    
    const totalSlots = daysDiff * slotsPerDay;
    setPreviewCount(totalSlots);
  };

  // Определение периода дня для времени
  const getTimePeriod = (hour24: number): 'morning' | 'afternoon' | 'evening' => {
    if (hour24 >= 5 && hour24 < 12) return 'morning';
    if (hour24 >= 12 && hour24 < 17) return 'afternoon';
    return 'evening';
  };

  const onSubmit = async (values: FormValues) => {
    if (!values.includeMorning && !values.includeAfternoon && !values.includeEvening) {
      return error("Выберите хотя бы один период дня");
    }
    
    try {
      if (!values.startDate || !values.endDate) {
        return error("Выберите начальную и конечную даты");
      }
      
      const startDate = new Date(values.startDate);
      const endDate = new Date(values.endDate);
      const dates: string[] = [];
      
      // Генерируем все даты в выбранном диапазоне
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
        dates.push(dateStr);
      }
      
      // Генерируем все временные слоты
      const timeSlots: Array<{ time: string, period: 'morning' | 'afternoon' | 'evening' }> = [];
      const startHour = to24HourFormat(values.startTime);
      const endHour = to24HourFormat(values.endTime);
      
      for (let hour = startHour; hour <= endHour; hour++) {
        const period = getTimePeriod(hour);
        
        // Пропускаем период, если он не выбран
        if (
          (period === 'morning' && !values.includeMorning) ||
          (period === 'afternoon' && !values.includeAfternoon) ||
          (period === 'evening' && !values.includeEvening)
        ) {
          continue;
        }
        
        // Формируем время в 24-часовом формате для сервера
        const timeStr = `${hour.toString().padStart(2, '0')}:00`;
        timeSlots.push({ time: timeStr, period });
      }
      
      // Формируем данные для отправки на сервер
      const bulkData = {
        dates,
        times: timeSlots,
        limits: values.limits
      };
      
      await addBulkSelectDateTime(bulkData).unwrap();
      succeed(`Добавлено ${previewCount} временных слотов!`);
      await triggerAllSelectDateTimeQuery().unwrap();
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Произошла ошибка при создании временных слотов";
      error(errorMessage);
    }
  };

  // Функция для массового удаления временных слотов
  const onDeleteBulk = async (values: DeleteFormValues) => {
    if (!values.startDate || !values.endDate) {
      return error("Выберите начальную и конечную даты для удаления");
    }

    try {
      setIsDeletingDates(true);
      
      const startDate = new Date(values.startDate);
      const endDate = new Date(values.endDate);
      const dates: string[] = [];
      
      // Генерируем все даты в выбранном диапазоне
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
        dates.push(dateStr);
      }

      // Получаем все слоты времени
      const allTimesResponse = await triggerAllSelectDateTimeQuery().unwrap();
      const allTimes = allTimesResponse?.rows || [];
      
      // Фильтруем слоты, которые попадают в выбранный диапазон дат
      const slotsToDelete = allTimes.filter(slot => dates.includes(slot.date));
      
      // Удаляем каждый слот
      let deletedCount = 0;
      let errorCount = 0;
      
      for (const slot of slotsToDelete) {
        try {
          await deleteSelectDateTime(slot.id).unwrap();
          deletedCount++;
        } catch (err) {
          errorCount++;
        }
      }
      
      setIsDeleteModalOpen(false);
      deleteForm.reset();
      
      if (deletedCount > 0) {
        succeed(`Удалено ${deletedCount} временных слотов${errorCount > 0 ? `, не удалось удалить ${errorCount} слотов` : ''}`);
        await triggerAllSelectDateTimeQuery().unwrap();
      } else if (errorCount > 0) {
        error(`Не удалось удалить выбранные слоты времени. Возможно, они используются в бронированиях.`);
      } else {
        succeed(`Нет слотов для удаления в выбранном диапазоне дат`);
      }
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Произошла ошибка при удалении временных слотов";
      error(errorMessage);
    } finally {
      setIsDeletingDates(false);
    }
  };

  // Генерируем список временных меток для выбора
  const generateTimeOptions = () => {
    const options = [];
    
    for (let hour = 0; hour < 24; hour++) {
      options.push({ value: to12HourFormat(hour), label: to12HourFormat(hour) });
    }
    
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>Массовое добавление временных слотов</Text>
          <Button 
            variant="outline" 
            color="red" 
            onClick={() => setIsDeleteModalOpen(true)}
            leftSection={<IconTrash size={16} />}
            size="xs"
          >
            Массовое удаление
          </Button>
        </Group>
      </Card.Section>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Grid mt="md">
          <Grid.Col span={6}>
            <DatePickerInput
              label="Начальная дата"
              placeholder="Выберите начальную дату"
              {...form.getInputProps('startDate')}
              onChange={(value: Date | null) => {
                form.setFieldValue('startDate', value);
                calculatePreview({...form.values, startDate: value});
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DatePickerInput
              label="Конечная дата"
              placeholder="Выберите конечную дату"
              minDate={form.values.startDate || undefined}
              {...form.getInputProps('endDate')}
              onChange={(value: Date | null) => {
                form.setFieldValue('endDate', value);
                calculatePreview({...form.values, endDate: value});
              }}
            />
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Select
              label="Начало рабочего дня"
              placeholder="Выберите время начала"
              data={timeOptions}
              {...form.getInputProps('startTime')}
              onChange={(value) => {
                if (value) {
                  form.setFieldValue('startTime', value);
                  calculatePreview({...form.values, startTime: value});
                }
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Конец рабочего дня"
              placeholder="Выберите время окончания"
              data={timeOptions}
              {...form.getInputProps('endTime')}
              onChange={(value) => {
                if (value) {
                  form.setFieldValue('endTime', value);
                  calculatePreview({...form.values, endTime: value});
                }
              }}
            />
          </Grid.Col>
          
          <Grid.Col span={6}>
            <NumberInput
              label="Интервал (минут)"
              placeholder="60"
              min={15}
              step={15}
              {...form.getInputProps('interval')}
              onChange={(value: string | number) => {
                // Преобразуем value в число перед передачей в форму
                const numValue = typeof value === 'string' ? parseInt(value) : value;
                form.setFieldValue('interval', numValue);
                calculatePreview({...form.values, interval: numValue});
              }}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label="Лимит бронирований"
              placeholder="3"
              min={1}
              {...form.getInputProps('limits')}
            />
          </Grid.Col>
          
          <Grid.Col span={12}>
            <Text size="sm" fw={500} mb="xs">Периоды дня</Text>
            <Group>
              <Checkbox
                label="Утро (5:00 AM - 11:59 AM)"
                {...form.getInputProps('includeMorning', { type: 'checkbox' })}
                onChange={(e) => {
                  form.setFieldValue('includeMorning', e.currentTarget.checked);
                  calculatePreview({...form.values, includeMorning: e.currentTarget.checked});
                }}
              />
              <Checkbox
                label="День (12:00 PM - 4:59 PM)"
                {...form.getInputProps('includeAfternoon', { type: 'checkbox' })}
                onChange={(e) => {
                  form.setFieldValue('includeAfternoon', e.currentTarget.checked);
                  calculatePreview({...form.values, includeAfternoon: e.currentTarget.checked});
                }}
              />
              <Checkbox
                label="Вечер (5:00 PM - 11:59 PM)"
                {...form.getInputProps('includeEvening', { type: 'checkbox' })}
                onChange={(e) => {
                  form.setFieldValue('includeEvening', e.currentTarget.checked);
                  calculatePreview({...form.values, includeEvening: e.currentTarget.checked});
                }}
              />
            </Group>
          </Grid.Col>
        </Grid>
        
        {previewCount > 0 && (
          <Text mt="md" c="blue" fw={500}>
            Будет создано примерно {previewCount} временных слотов
          </Text>
        )}
        
        <Button 
          type="submit" 
          fullWidth 
          mt="xl" 
          loading={isLoading}
          disabled={previewCount === 0}
        >
          Создать временные слоты
        </Button>
      </form>

      {/* Модальное окно для массового удаления */}
      <Modal 
        opened={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Массовое удаление временных слотов"
      >
        <form onSubmit={deleteForm.onSubmit(onDeleteBulk)}>
          <Grid>
            <Grid.Col span={12}>
              <Text size="sm" color="red" mb="sm">
                Внимание! Эта операция удалит все временные слоты в выбранном диапазоне дат.
                Слоты, которые уже имеют бронирования, не будут удалены.
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                label="Начальная дата"
                placeholder="Выберите начальную дату"
                {...deleteForm.getInputProps('startDate')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                label="Конечная дата"
                placeholder="Выберите конечную дату"
                minDate={deleteForm.values.startDate || undefined}
                {...deleteForm.getInputProps('endDate')}
              />
            </Grid.Col>
            <Grid.Col span={12} mt="md">
              <Group justify="flex-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Отмена
                </Button>
                <Button 
                  type="submit" 
                  color="red"
                  loading={isDeletingDates}
                >
                  Удалить
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
    </Card>
  );
}; 