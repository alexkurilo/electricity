/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */

class Household {
  connectsToHousehold = []
  connectsToPowerPlant = []
  
  addConnectToPowerPlant(powerPlant) {
    let index = this.connectsToPowerPlant.findIndex((power => power === powerPlant))
    index === -1 && this.connectsToPowerPlant.push(powerPlant)
  }
  
  removeConnectToPowerPlant(powerPlant) {
    let index = this.connectsToPowerPlant.findIndex((power => power === powerPlant))
    index !== -1 && this.connectsToPowerPlant.splice(index, 1)
  }
  
  addConnectToHousehold(household) {
    let index = this.connectsToHousehold.findIndex((house => house === household))
    index === -1 && this.connectsToHousehold.push(household)
  }
}

class PowerPlant {
  isKilled = false
  connects = []
  
  addConnect(household) {
    let index = this.connects.findIndex((house => house === household))
    index === -1 && this.connects.push(household)
  }
  removeConnect(household) {
    let index = this.connects.findIndex((house => house === household))
    index !== -1 && this.connects.splice(index, 1)
  }
  kill() {
    this.isKilled = true
  }
  repair() {
    this.isKilled = false
  }
}

export class World {
  verifiedToHousehold = []
  
  createPowerPlant() {
    return new PowerPlant()
  }

  createHousehold() {
    return new Household()
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    powerPlant.addConnect(household)
    household.addConnectToPowerPlant(powerPlant)
  }

  connectHouseholdToHousehold(household1, household2) {
    if (household1 !== household2) {
      household1.addConnectToHousehold(household2)
      household2.addConnectToHousehold(household1)
    }
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    powerPlant.removeConnect(household)
    household.removeConnectToPowerPlant(powerPlant)
  }

  killPowerPlant(powerPlant) {
    powerPlant.kill()
  }

  repairPowerPlant(powerPlant) {
    powerPlant.repair()
  }

  householdHasEletricity(household) {
    if (this.isConnectToWorkedPowerPlant(household)) {
      return true
    } else if (household.connectsToHousehold.length) {
      this.verifiedToHousehold = []
      return this.isConnectHouseholdHasEletricity(household)
    } else {
      return false
    }
  }
  
  isConnectToWorkedPowerPlant(household) {
    return household.connectsToPowerPlant.some(power => !power.isKilled)
  }
  
  isConnectHouseholdHasEletricity(household) {
    if (household.connectsToHousehold.length) {
      for (let i = 0; i < household.connectsToHousehold.length; i++) {
        if (this.verifiedToHousehold.some(house => house === household.connectsToHousehold[i])) {
          if (i < household.connectsToHousehold.length - 1) {
            continue
          } else {
            return this.isConnectToWorkedPowerPlant(household)
          }
        } else {
          if (this.isConnectToWorkedPowerPlant(household)) {
            return true
          } else {
            this.verifiedToHousehold.push(household.connectsToHousehold[i])
            return this.isConnectHouseholdHasEletricity(household.connectsToHousehold[i]);
          }
        }
      }
    } else {
      return false
    }
  }
}
