import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPropsList } from "../../../storage/StackParams";
import { Account } from "../../../storage/classes/AccountClass";
import { RouteProp } from "@react-navigation/native";
import { View } from "react-native";

type CreateSubscriptionProps = {
    route: RouteProp<RootStackPropsList, 'CreateSubscription'>,
    navigation: StackNavigationProp<RootStackPropsList, 'CreateSubscription'>,
}

const CreateSubscriptionScreen = ({route, navigation}: CreateSubscriptionProps) => {
    const { account } = route.params;

    return (
        <View>
            
        </View>
    )
}