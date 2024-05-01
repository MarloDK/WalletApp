import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Header2 } from "../../components/CustomTextComponents";
import { InputField } from "../../components/InputFieldComponents";
import { BudgetListItem } from "../../components/new/BudgetListItem";
import { CreateNewButton } from "../../components/new/CreateNewButton";
import { InstanceCreator } from "../../components/new/InstanceCreator";
import { stylingConfig } from "../../configs/styling.config";
import { RootStackPropsList } from "../../storage/StackParams";
import { Expense } from "../../storage/classes/ExpenseClass";
import { SavingsGoal } from "../../storage/classes/SavingsGoalClass";
import { addSavingsGoal, getSavingsGoals } from "../../storage/database";

type SavingScreenProps = {
    navigation: StackNavigationProp<RootStackPropsList, 'Saving'>;
}

export const SavingScreen = (props: SavingScreenProps) => {
    const [savingsGoals, setSavingsGoals] = useState(Array<SavingsGoal>);

    const [rerenderKey, setRerenderKey] = useState(0);

    const fetchItems = async () => {
        console.log("Fetching Savings Goals");

        const newSavingsGoals = getSavingsGoals();

        if (newSavingsGoals != savingsGoals) {
            setSavingsGoals(newSavingsGoals);
        }

        setRerenderKey(oldKey => oldKey + 1);   // Force a rerender since React Native doesn't
                                                // Detect setSavingsGoals() updating.
    }

    useEffect(() => {
        const onFocus = props.navigation.addListener('focus', () => {
            fetchItems();
        });

        // Return constants to avoid memory leak
        return onFocus;
    });

    const renderItem = (item: any) => {
        return <BudgetListItem navigation={props.navigation} onPress={onEditSavingsGoalModalOpen} item={item} />
    }



    const [isNewSavingsGoalModalVisible, setIsNewSavingsGoalModalVisible] = useState(false);
    const [isEditSavingsGoalModalVisible, setIsEditSavingsGoalModalVisible] = useState(false);

    const [savingsGoalBeingEdited, setSavingsGoalBeingEdited] = useState(new SavingsGoal('', 0, 0));
    const [newSavingsGoalName, setNewSavingsGoalName] = useState('');
    const [newSavingsGoalTarget, setNewSavingsGoalTarget] = useState(0);
    const [newSavingsGoalSaved, setNewSavingsGoalSaved] = useState(0);

    const onNewSavingsGoalModalOpen = () => {
        setIsNewSavingsGoalModalVisible(true);
    }

    const onEditSavingsGoalModalOpen = (savingsGoal: Expense | SavingsGoal) => {
        if (savingsGoal instanceof Expense) {
            return;
        }

        setSavingsGoalBeingEdited(savingsGoal);
        setNewSavingsGoalName(savingsGoal.name);
        setNewSavingsGoalTarget(savingsGoal.targetAmount);
        setNewSavingsGoalSaved(savingsGoal.savedAmount);

        setIsEditSavingsGoalModalVisible(true);
    }

    const onNewSavingsGoalModalClose = () => {
        setIsNewSavingsGoalModalVisible(false);
    }

    const onEditSavingsGoalModalClose = () => {
        setIsEditSavingsGoalModalVisible(false);
        resetModalInputs();
    }

    const onNewSavingsGoalModalSubmit = () => {
        setIsNewSavingsGoalModalVisible(false);

        console.log("Create new savings goal instance");

        let newSavingsGoal = new SavingsGoal(
            newSavingsGoalName,
            newSavingsGoalTarget,
            newSavingsGoalSaved
        );

        addSavingsGoal(newSavingsGoal);
        fetchItems();
        resetModalInputs();
    }

    const onEditSavingsGoalModalSubmit = () => {
        setIsEditSavingsGoalModalVisible(false);

        savingsGoalBeingEdited.name = newSavingsGoalName;

        fetchItems();
        resetModalInputs();
    }

    const resetModalInputs = () => {
        setNewSavingsGoalName('');
        setNewSavingsGoalTarget(0);
        setNewSavingsGoalSaved(0);

        setRerenderKey(oldKey => oldKey + 1);
    }

    return (
        <View style={styles.appWrapper}>
            <InstanceCreator 
                title={"New Savings Goal"} 
                submitText={"Create Savings Goal"}
                isVisible={isNewSavingsGoalModalVisible} 
                onClose={onNewSavingsGoalModalClose} 
                onSubmit={onNewSavingsGoalModalSubmit} 
            >
                <InputField 
                    placeholder="Savings goal name" 
                    name="Name" 
                    maxLength={30}
                    keyboardType="ascii-capable"
                    onValueChange={(text) => setNewSavingsGoalName(text)}
                    value={newSavingsGoalName}
                />
                <InputField 
                    placeholder="0" 
                    name="Target"
                    keyboardType="number-pad" 
                    suffix="USD"
                    onValueChange={(text) => setNewSavingsGoalTarget(text === '' ? 0 : parseInt(text))}
                    value={newSavingsGoalTarget.toString()}
                />
                <InputField 
                    placeholder="0" 
                    name="Currently saved"
                    keyboardType="number-pad"
                    suffix="USD"
                    onValueChange={(text) => setNewSavingsGoalSaved(text === '' ? 0 : parseInt(text))}
                    value={newSavingsGoalSaved.toString()}
                />
            </InstanceCreator>
            
            <InstanceCreator 
                title={"Edit Savings Goal"} 
                submitText={"Save Changes"}
                isVisible={isEditSavingsGoalModalVisible} 
                onClose={onEditSavingsGoalModalClose} 
                onSubmit={onEditSavingsGoalModalSubmit} 
            >
                <InputField 
                    placeholder="Savings goal name" 
                    name="Name" 
                    maxLength={30}
                    keyboardType="ascii-capable"
                    onValueChange={(text) => setNewSavingsGoalName(text)}
                    value={newSavingsGoalName}
                />
                <InputField 
                    placeholder="0" 
                    name="Target"
                    keyboardType="number-pad" 
                    suffix="USD"
                    onValueChange={(text) => setNewSavingsGoalTarget(text === '' ? 0 : parseInt(text))}
                    value={newSavingsGoalTarget.toString()}
                />
                <InputField 
                    placeholder="0" 
                    name="Currently saved"
                    keyboardType="number-pad"
                    suffix="USD"
                    onValueChange={(text) => setNewSavingsGoalSaved(text === '' ? 0 : parseInt(text))}
                    value={newSavingsGoalSaved.toString()}
                />
            </InstanceCreator>

            <View style={styles.headerExtension} />
            <View style={styles.container}>
                <View style={styles.savingsGoalsOverview}>
                    <Header2>Savings Goals</Header2>
                    <FlatList 
                        key={rerenderKey}
                        data={savingsGoals}
                        numColumns={1}
                        contentInset={{ bottom: 70 }}
                        renderItem={({item}) => renderItem(item)}
                        keyExtractor={(item, index) => `budget-${index}`}
                    />
                </View>
            </View>

            <CreateNewButton onPress={onNewSavingsGoalModalOpen} />
        </View>
    )
}

const styles = StyleSheet.create({
    appWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: stylingConfig.colors.background,
    },
    container: {
        paddingTop: 30,
        marginHorizontal: '5%',
        alignItems: 'flex-start',
        flexDirection: 'column',
        height: 380,
    },
    headerExtension: {
        backgroundColor: stylingConfig.colors.primary,
        width: '100%',
        height: 30,
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    savingsGoalsOverview: {

    },
});