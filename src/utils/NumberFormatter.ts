export function formatNumber(num: number, locale: string = 'da-dk', maxFractions: number = 2): string {
    if (num < 1000000) {
        return num.toLocaleString(locale, { maximumFractionDigits: maxFractions });
    }

    const numInMillions = num / 1000000;
    const integerPart = Math.floor(numInMillions);
    const decimalPart = numInMillions - integerPart;

    const decimalStr = decimalPart.toString().substring(2, 2 + maxFractions).padEnd(maxFractions, '0');
    const formattedMillion = `${integerPart}${decimalStr == "00" || decimalStr.length === 0 ? "" : "," + decimalStr}`;

    return `${formattedMillion} mio.`;
}