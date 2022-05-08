import { openDatabase, SQLError, SQLResultSet, SQLTransaction, WebSQLDatabase } from 'expo-sqlite'

const DATABASE_NAME: string = 'hotel'

export const transaction = (name: string = DATABASE_NAME): Promise<SQLTransaction> => {
    const db: WebSQLDatabase = openDatabase(name)
    return new Promise((resolve, reject) => 
        db.transaction(
            (tx: SQLTransaction) => resolve(tx), 
            (txError) => reject(txError),
        ),
    )
}

export const statement = (tx: SQLTransaction, sql: string, params?: any[] | undefined): Promise<SQLResultSet> => {
    return new Promise((resolve, reject) => {
        tx.executeSql(
            sql, 
            params, 
            (tx: SQLTransaction, res: SQLResultSet) => resolve(res),
            (tx: SQLTransaction, error: SQLError) => {
                reject(error)
                return false
            },
        )
    })
}