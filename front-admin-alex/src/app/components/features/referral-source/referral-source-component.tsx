import { useState } from "react";
import { ActionIcon, Group, LoadingOverlay, Modal, Table, TextInput } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useNotification } from "../../../hooks/useNotification/useNotification";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import { ReferralSource } from "../../../types";
import { useUpdateReferralSourceMutation, useDeleteReferralSourceMutation } from "../../../services/referralSourceApi";
import { errorMessages } from "../../../../utils/has-error-field";

type PropTypes = {
     text: string;
     data?: {
          rows: ReferralSource[];
          count: number;
     };
     isLoading: boolean;
     refetch: () => void;
};

export const ReferralSourceComponent = ({ isLoading, data, text, refetch }: PropTypes) => {
     const { succeed, error } = useNotification();
     const [opened, setOpened] = useState(false);
     const [id, setId] = useState<number>(0);
     const [deleteSource] = useDeleteReferralSourceMutation();
     const [updateSource, { isLoading: updateLoading }] = useUpdateReferralSourceMutation();

     const form = useForm({
          initialValues: {
               name: "",
          },
          validate: {
               name: (value) => (value.length < 2 ? "Name should have at least 2 letters" : null),
          },
     });

     const handleUpdate = async (values: { name: string }) => {
          try {
               const res = await updateSource({ name: values.name, id }).unwrap();
               succeed(res.message);
               setOpened(false);
               await refetch();
          } catch (err) {
               error(errorMessages(err));
          }
     };

     const handleDelete = async (id: number) => {
          if (window.confirm("Are you sure you want to delete this referral source?")) {
               try {
                    const res = await deleteSource(id).unwrap();
                    succeed(res.message);
                    await refetch();
               } catch (err) {
                    error(errorMessages(err));
               }
          }
     };

     const handleEdit = (id: number, name: string) => {
          setId(id);
          form.setValues({ name });
          setOpened(true);
     };

     const rows = data?.rows.map((item) => (
          <Table.Tr key={item.id}>
               <Table.Td>{item.name}</Table.Td>
               <Table.Td>
                    <Group gap={4} justify="flex-end" wrap="nowrap">
                         <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="blue"
                              onClick={() => handleEdit(item.id, item.name)}
                         >
                              <IconPencil size={16} />
                         </ActionIcon>
                         <ActionIcon
                              size="sm"
                              variant="subtle"
                              color="red"
                              onClick={() => handleDelete(item.id)}
                         >
                              <IconTrash size={16} />
                         </ActionIcon>
                    </Group>
               </Table.Td>
          </Table.Tr>
     ));

     return (
          <>
               <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={`Update Source`}
                    centered
               >
                    <form onSubmit={form.onSubmit(handleUpdate)}>
                         <TextInput
                              withAsterisk
                              label="Source Name"
                              placeholder="Update source name"
                              {...form.getInputProps("name")}
                         />

                         <Group justify="flex-end" mt="md">
                              <Button type="submit" loading={updateLoading}>
                                   Update
                              </Button>
                         </Group>
                    </form>
               </Modal>

               <div className="relative min-h-[300px]">
                    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                    {data && data.rows.length === 0 ? (
                         <div className="flex h-[300px] items-center justify-center">No data</div>
                    ) : (
                         <Table>
                              <Table.Thead>
                                   <Table.Tr>
                                        <Table.Th>Name</Table.Th>
                                        <Table.Th style={{ textAlign: "right" }}>Action</Table.Th>
                                   </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>{rows}</Table.Tbody>
                         </Table>
                    )}
               </div>
          </>
     );
}; 