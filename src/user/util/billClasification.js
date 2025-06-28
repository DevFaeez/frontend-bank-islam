export function formatBillData(data) {
    return data.reduce((acc, item) => {
        const billNameKey = item.BILLNAME.toLowerCase().replace(/\s+/g, "_");
        const provider = {
            key: item.PROVIDERTYPEID.toLowerCase(),
            label: item.PROVIDERNAME
        };

        let billGroup = acc.find(group => group.billType === billNameKey);

        if (!billGroup) {
            billGroup = { billType: billNameKey, providers: [] };
            acc.push(billGroup);
        }

        billGroup.providers.push(provider);

        return acc;
    }, []);
}
