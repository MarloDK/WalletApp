export class Expense {
    /**
     * Creates a new Savings goal instance.
     * @param private _name The name of the expense goal.
     * @param private _total The total expense.
     * @param private _currentlySpent The current amount spent this month on the expense.
     */
    constructor(
        private _name: string, 
        private _allocated: number, 
        private _currentlySpent: number, 
    ) { }


    
    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }

    get allocated(): number {
        return this._allocated;
    }

    set allocated(newAllocated: number) {
        if (newAllocated <= 0) {
            return;
        }

        this._allocated = newAllocated;
    }

    get currentlySpent(): number {
        return this._currentlySpent;
    }

    set currentlySpent(newCurrentlySpent: number) {
        this._currentlySpent = newCurrentlySpent;
    }

    addToSpentAmount(amnt: number) {
        this._currentlySpent += amnt;
    }
}