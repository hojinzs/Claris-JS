////////////////////////////////////////////
// ES6 Class & module load Tutorial
////////////////////////////////////////////

class SCR2 {
    constructor(inputName = [])
    {
        this.firstName = inputName[0]
        this.lastName = inputName[1]
        console.log('SCR2 value is ::',this.firstName,'-',this.lastName);
    }

    get name()
    {
        let name = this.firstName+' '+this.lastName;
        console.log(name);
        return name;
    }

    set name(newName = [])
    {
        this.firstName = newName[0];
        this.lastName = newName[1];
        console.log('SCR2 value is now ::',this.name);
    }
}

export default SCR2;