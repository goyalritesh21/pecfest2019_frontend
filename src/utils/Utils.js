import * as queryString from 'query-string'

export function extractSearchParams(props) {
    return queryString.parse(props.history.location.search);
}

export function addQuery(props, query) {
    const searchQuery = Object.assign(queryString.parse(props.history.location.search), query);

    props.history.push({
        search: queryString.stringify(searchQuery),
    });
}

export function removeQuery(props, ...queryNames) {
    const searchQuery = Object.assign({}, queryString.parse(props.history.location.search));
    queryNames.forEach(q => delete searchQuery[q]);

    props.history.push({
        search: queryString.stringify(searchQuery),
    });
}

export const ANIMATION_STATE = {
    'NO_OPS': 0,
    'OPEN': 1,
    'CLOSE': 2
};