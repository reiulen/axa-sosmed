type QueryParams = {
    baseUrl: string;
    query: {
        [key: string]: string | number | boolean | null | undefined;
    };
};

export const buildUrl = ({ baseUrl, query }: QueryParams) => {
    const queryString = Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join("&");

    return `${baseUrl}?${queryString}`;
};

export const avatarName = (name: string) => {
    return `https://ui-avatars.com/api/?name=${name}&color=7F9CF5&background=EBF4FF`
}

export const findMax = (data: any[], key = 'id') => {
    const maxId = data.reduce((max, obj) => {
        return obj.id > max ? obj?.[key] : max;
      }, -Infinity);
    return maxId;
}