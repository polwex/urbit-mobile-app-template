export const deSig = (patp: string) => patp.replace(/^~/, '');

export const removeQuery = (url: string) => url.replace(/\?.*$/, '');

export const samePath = (url1 = '/', url2 = '/') => removeQuery(url1) === removeQuery(url2);

export const capitalize = (word: string) => word[0].toLocaleUpperCase() + word.substring(1)
