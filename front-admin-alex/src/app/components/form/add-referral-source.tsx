import { useForm } from "@mantine/form";
import { useNotification } from "../../hooks/useNotification/useNotification";
import { Button, TextInput, Card } from "@mantine/core";
import { useAddReferralSourceMutation } from "../../services/referralSourceApi";
import { errorMessages } from "../../../utils/has-error-field";

interface AddReferralSourceProps {
     refetch: () => void;
}

export const AddReferralSource = ({ refetch }: AddReferralSourceProps) => {
     const [addReferralSource, { isLoading }] = useAddReferralSourceMutation();
     const { succeed, error } = useNotification();

     const form = useForm({
          initialValues: { name: "" },
          validate: {
               name: (value) => (value.length < 3 ? "Name should have at least 3 characters" : null),
          },
     });

     const onSubmit = async (values: { name: string }) => {
          try {
               const res = await addReferralSource({ name: values.name }).unwrap();
               succeed(res.message);
               form.reset();
               await refetch();
          } catch (err) {
               error(errorMessages(err));
          }
     };

     return (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
               <Card.Section withBorder inheritPadding py="xs">
                    <div className="text-base font-medium">Add New Referral Source</div>
               </Card.Section>

               <form onSubmit={form.onSubmit(onSubmit)}>
                    <TextInput
                         mt="sm"
                         label="Source Name"
                         placeholder="Enter source name (e.g. Google, Friend, Social Media)"
                         withAsterisk
                         {...form.getInputProps("name")}
                    />

                    <Button type="submit" mt="lg" loading={isLoading} fullWidth>
                         Add Referral Source
                    </Button>
               </form>
          </Card>
     );
}; 