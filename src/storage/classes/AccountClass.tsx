import { AccountIcons } from "../../utils/LogosAndIcons";
import { AccountType } from "../AccountTypeEnum";
import { Transaction } from "./TransactionClass";

export class Account {
    private _transactionHistory: Array<Transaction> = new Array<Transaction>();
    private _icon: JSX.Element = AccountIcons.Account(20, "#FFF");

    /**
     * Creates a new instance of the Loan class.
     * @param private _name The name of the account.
     * @param readonly bankId The bank reference id (First 4 digits).
     * @param readonly accountId The id of the account.
     * @param private _balance The balance on the account.
     * @param transactionHistory Optional array of transactions for intializing the transaction history of the account.
     */
    constructor(
        private _name: string, 
        readonly accountType: AccountType,
        readonly bankId: number, 
        readonly accountId: number, 
        private _balance: number, 
        icon?: JSX.Element,
        transactionHistory?: Array<Transaction>,
    )   {
        if (icon)
            this._icon = icon;
        if (transactionHistory)
            this._transactionHistory = transactionHistory;
    }

    /**
     * Gets the name of the account holder.
     * @returns The name of the account holder.
     */
    getName(): string {
        return this._name;
    }

    /**
     * Sets the name of the account holder.
     * @param name The new name of the account holder.
     */
    setName(name: string) {
        this._name = name;
    }

    /**
     * Gets the icon for the account.
     * @returns The icon for the account.
     */
    getIcon(): JSX.Element {
        return this._icon;
    }

    /**
     * Sets the icon for the account.
     * @param icon The new icon for the account.
     */
    setIcon(icon: JSX.Element) {
        this._icon = icon;
    }

    /**
     * Gets the full id of the account (xxxx xxxxxxxxxx).
     * @returns The full id of the account formatted as xxxx xxxxxxxxxx.
     */
    getFullId(): string {
        return `${this.bankId} ${this.accountId}`;
    }

    /**
     * Gets the balance of the account.
     * @returns The balance of the account.
     */
    getBalance(): number {
        return this._balance;
    }

    /**
     * Gets the balance of the account.
     * @returns The balance of the account.
     */
    deposit(amount: number) {
        this._balance += amount;
    }

    /**
     * Gets the balance of the account.
     * @returns The balance of the account.
     */
    withdraw(amount: number) {
        let tempBalance = this._balance - amount;

        if (this.accountType === AccountType.DEBIT && tempBalance < 0)
            return console.warn(`Couldn't withdraw ${amount} from account ${this.getFullId()}. \nBalance would've been ${tempBalance}.`);
        this._balance -= amount;
    }

    /**
     * Gets the full transaction history of the account.
     * @returns An array of transaction objects.
     */
    getTransactionHistory(): Array<Transaction> {
        return this._transactionHistory;
    }

    /**
     * Adds a new transaction to the transaction history of the account.
     * @param transaction The transaction to be added.
     */
    addTransaction(transaction: Transaction) {
        this._transactionHistory.push(transaction);
    }

    /**
     * Removes a specified transaction from the transaction history of the account.
     * @param transaction The transaction to be removed.
     */
    removeTransaction(transaction: Transaction) {
        let indexOfTransaction = this._transactionHistory.findIndex((element) => element === transaction);
        if (indexOfTransaction)
            this._transactionHistory.splice(indexOfTransaction);
    }

    /**
     * Gets the latest transaction that has occured.
     * @returns The latest transaction that has occured.
     */
    getLatestTransaction(): Transaction {
        return this._transactionHistory[0];
    }
}