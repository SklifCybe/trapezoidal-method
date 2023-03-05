export const mapArrayToNumber = (array: string[]) =>
    array.map((element) => {
        if (element.trim() === '') {
            return undefined;
        }

        const number = Number(element);

        if (Number.isNaN(number)) {
            return element;
        }

        return number;
    });
