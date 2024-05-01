// Returns num as formatted number as a string
export function formatNumber(num: number, locale: string = 'en-us', maxFractions: number = 2): string {
    // If the number is less than 1 million, return locale string
    if (num < 1000000) {
        return num.toLocaleString(locale, { maximumFractionDigits: maxFractions });
    }

    // Get number as million
    const numInMillions = num / 1000000;

    // Split the number into integer and decimal part
    const integerPart = Math.floor(numInMillions);
    const decimalPart = numInMillions - integerPart;

    // Add padding to decimal, example: .6 => .60
    const decimalStr = decimalPart.toString().substring(2, 2 + maxFractions).padEnd(maxFractions, '0');
    // Join number to formatted string
    const formattedMillion = `${integerPart}${decimalStr == "00" || decimalStr.length === 0 ? "" : "." + decimalStr}`;

    // Return the string with M as a suffix
    return `${formattedMillion}M`;
}