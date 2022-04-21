import { openDatabase, SQLError, SQLResultSet, SQLStatementCallback, SQLStatementErrorCallback, SQLTransaction, SQLTransactionCallback, WebSQLDatabase } from 'expo-sqlite'

const DATABASE_NAME: string = 'hotel'

export const transaction = (name: string = DATABASE_NAME): Promise<SQLTransaction> => {
    const db: WebSQLDatabase = openDatabase(name)

    // #2 Maak een transaction aan
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
            (tx: SQLTransaction, res: SQLResultSet) => resolve(res), //als de query succesfull is 
            (tx: SQLTransaction, error: SQLError) => { //als de query mislukt
                reject(error)
                return false //return false --> vereiste van transaction callback
            },
        )
    })
}