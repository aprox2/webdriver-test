
// Remove the word "Now" if in price
// This shows up in products that have a discount
export const cleanProductPrice = (price: string): string => {
    const removableString = "Now";
    if (!price.includes(removableString)) return price.trim();
    return price.replace(removableString, '').trim();
}
