import { Card, Grid, Text, Title } from "@mantine/core";
import { useGetAllReferralSourcesQuery } from "../../../services/referralSourceApi";
import { ReferralSourceComponent } from "../../features/referral-source/referral-source-component";
import { AddReferralSource } from "../../form/add-referral-source";

export const ReferralSourcePage = () => {
     const { data, isLoading, refetch } = useGetAllReferralSourcesQuery(undefined);

     return (
          <div>
               <h2 className="mb-6">Referral Sources</h2>
               <Grid>
                    <Grid.Col span={6}>
                         <Card withBorder padding="lg" radius="md">
                              <Title order={4} mb="md">Add New Referral Source</Title>
                              <Text c="dimmed" size="sm" mb="lg">
                                   Add a new source of how clients found the company
                              </Text>
                              <AddReferralSource refetch={refetch} />
                         </Card>
                    </Grid.Col>

                    <Grid.Col span={6}>
                         <Card withBorder padding="lg" radius="md">
                              <Title order={4} mb="md">Referral Sources List</Title>
                              <Text c="dimmed" size="sm" mb="lg">
                                   Manage sources of how clients found the company
                              </Text>
                              <ReferralSourceComponent
                                   isLoading={isLoading}
                                   data={data}
                                   text="Referral Source"
                                   refetch={refetch}
                              />
                         </Card>
                    </Grid.Col>
               </Grid>
          </div>
     );
}; 