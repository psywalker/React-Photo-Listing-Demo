const getURLParam = (url, search) => new URL(url).searchParams.get(search);
export default getURLParam;
