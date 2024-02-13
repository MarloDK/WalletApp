import { StyleSheet, View } from "react-native"
import { AppText } from "../../../components/CustomTextComponents";
import { InputField } from "../../../components/InputFieldComponents";

export const SubscriptionCreationScreen = () => {
    return (
        <View style={styles.container}>
            <InputField
                name={'Navn'}
                placeholder={'Eks. "Spotify"'}
            />
            <View style={{flexDirection: 'row', columnGap: 10}}>
                <InputField
                    name={'Pris'}
                    placeholder={'0'}
                    suffix={'DKK'}
                    flex={1}
                    keyboardType={'number-pad'}
                />
                <InputField
                    name={'Betalingsperiode'}
                    placeholder={'Månedlig'}
                    flex={1}
                />
            </View>
            <InputField
                name={'Næste betaling'}
                placeholder={'31/12/2024'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
    }
});