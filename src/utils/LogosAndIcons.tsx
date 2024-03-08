import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { stylingConfig } from '../configs/styling.config';

export const BrandLogos = {
    "AppleTV": require('../assets/images/brandLogos/Apple TV.png'),
    "DAZN": require('../assets/images/brandLogos/DAZN.png'),
    "Disney": require('../assets/images/brandLogos/Disney.png'),
    "ESPN": require('../assets/images/brandLogos/ESPN.png'),
    "HBOMax": require('../assets/images/brandLogos/HBO MAX.png'),
    "Hulu": require('../assets/images/brandLogos/Hulu.png'),
    "Paramount": require('../assets/images/brandLogos/Paramount.png'),
    "Playstation": require('../assets/images/brandLogos/Playstation.png'),
    "Spotify": require('../assets/images/brandLogos/Spotify.png'),
    "Tencent": require('../assets/images/brandLogos/Tencent.png'),
    "TV2": require('../assets/images/brandLogos/TV2.png'),
    "Twitch": require('../assets/images/brandLogos/Twitch.png'),
}

const defaultSize: number = 20, defaultColor: string = stylingConfig.colors.secondaryVar;

export const AccountIcons = {
    Savings: (size: number = defaultSize, color: string = defaultColor) => <MaterialIcons name={"savings"} size={size} color={color}/>,
    Account: (size: number = defaultSize, color: string = defaultColor) => <MaterialIcons name={"account-balance"} size={size} color={color}/>,
    AccountAlt: (size: number = defaultSize, color: string = defaultColor) => <MaterialCommunityIcons name={"account"} size={size} color={color}/>,
    Invest: (size: number = defaultSize, color: string = defaultColor) => <Entypo name={"line-graph"} size={size} color={color}/>,
}

export const LoanIcons = {
    House: (size: number = defaultSize, color: string = defaultColor) => <Fontisto name={"home"} size={size} color={color}/>,
    Car: (size: number = defaultSize, color: string = defaultColor) => <FontAwesome5 name={"car-alt"} size={size} color={color}/>,
    Student: (size: number = defaultSize, color: string = defaultColor) => <FontAwesome5 name={"user-graduate"} size={size} color={color}/>,
    Credit: (size: number = defaultSize, color: string = defaultColor) => <FontAwesome5 name={"credit-card"} size={size} color={color}/>,
    MoneyBill: (size: number = defaultSize, color: string = defaultColor) => <FontAwesome5 name={"money-bill"} size={size} color={color}/>,
}