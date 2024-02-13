import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPropsList } from "./StackParams";
import { RouteProp } from "@react-navigation/native";

type CreateEntityRouteProp = RouteProp<RootStackPropsList, 'CreateEntity'>;

export type EntityCreationTabProps = {
    tabButtons: JSX.Element;
}