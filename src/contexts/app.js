import {createContext} from "react"

/**
 * @type {React.Context<{
 *    tasks: Array<{
 *     id: number,
 *     name: string,
 *     datetime: string,
 *     completed: bool,
 *     subtasks: Array<{
 *         name: string
 *     }>,
 * }>
 * }>}
 */
const AppContext = createContext({
    activeTab: '',
    filterValue: '',
    tasks: [],
});

export default AppContext;
