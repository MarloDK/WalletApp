import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPropsList } from "../storage/StackParams";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "./CustomTextComponents";
import { Account } from "../storage/classes/AccountClass";
import { Subscription } from "../storage/classes/SubscriptionClass";
import { Loan } from "../storage/classes/LoanClass";

type CreateEntityRouteProp = RouteProp<RootStackPropsList, 'CreateEntity'>;

type Props = {
    navigation: StackNavigationProp<RootStackPropsList, 'CreateEntity'>;
    route: CreateEntityRouteProp;
    activeTabName: string;
    formData?: {};
}

const NavigationButtons = (props: Props) => {
    const createNewEntity = () => {
        let newEntity: Account | Subscription | Loan;

        switch (props.activeTabName) {
            case "Konto":

                break;
            case "Abonnement":

                break;
            case "Lån":

                break;
        
            default:
                break;
        }
    }



    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity 
                style={styles.createEntityButton}
                onPress={() => props.navigation.navigate('Home')}
            >
                <AppText style={styles.defaultButtonText}>Opret {props.activeTabName}</AppText>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => props.navigation.navigate('Home')}
            >
                <AppText style={[styles.defaultButtonText, {color: '#202B3F'}]}>Tilbage</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        alignItems: 'center',
        gap: 20,
        marginBottom: 80,
    },
    createEntityButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 225,
        height: 45,
        backgroundColor: '#202B3F',
        borderRadius: 50,
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 45,
        borderColor: '#202B3F',
        borderWidth: 2,
        borderRadius: 50,
    },
    defaultButtonText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
    },
});