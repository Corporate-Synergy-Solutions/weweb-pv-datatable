export default {
    editor: {
        label: {
            en: 'Datatable',
        },
    },
    properties: {
        size: {
            label: { en: 'Size' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'normal', label: { en: 'Normal' } },
                    { value: 'large', label: { en: 'Large' } },
                    { value: 'small', label: { en: 'small' } },
                ],
            },
            defaultValue: 'normal',
        },
        paginator: {
            label: {
                en: 'Pagination',
            },
            type: 'OnOff',
            defaultValue: false,
        },
        rows: {
            label: {
                en: 'Rows per page',
            },
            type: 'Number',
            options: {
                min: 1,
                max: 100,
                step: 1,
            },
            defaultValue: 5,
            hidden: content => !content.paginator,
        },
        showGridlines: {
            label: {
                en: 'Show gridlines',
            },
            type: 'OnOff',
            defaultValue: false,
        },
        stripedRows: {
            label: {
                en: 'Striped rows',
            },
            type: 'OnOff',
            defaultValue: false,
        },
        idComponentBind: {
            label: {
                en: 'Content variable id',
            },
            type: 'Text',
            defaultValue: '',
        },
        headers: {
            label: {
                en: 'Column header',
            },
            type: 'Text',
            defaultValue: '',
            bindingValidation: {
                type: 'string',
                tooltip: 'Separate headers with commas',
            },
        },
    },
};
