import { useGetAllUsersQuery } from "../../../services/userApi"
import { LoaderComponent } from "../../layout/loader"
import { User } from "./user"
import { ROLES } from "../../../types"
import { ScrolContainer } from "../../layout/scrol-container"

export const UserComponent = () => {
     const { data, isLoading } = useGetAllUsersQuery()

     return (
          <ScrolContainer>
               <p className="text-center text-xl sticky top-0">User list</p>
               {isLoading
                    ? <LoaderComponent  />
                    : data?.map((item) => (
                         <User
                              key={item.id}
                              role={item.role as ROLES}
                              login={item.login}
                              id={item.id}
                         />))}
          </ScrolContainer>
     )
}
