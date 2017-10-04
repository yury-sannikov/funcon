export { LTEAttendee } from './generators/lteAttendee'
export { LTEAgenda } from './generators/lteAgenda'
export { LTESpeaker } from './generators/lteSpeaker'
export { LTESite } from './generators/lteSite'
export { LTEEvent } from './generators/lteEvent'
export { LTEStore } from './generators/lteStore'
export { LTEUser } from './generators/lteUser'
export { LTESalesOrder } from './generators/lteSalesOrder'
export { LTESalesOrderLine } from './generators/lteSalesOrderLine'
export { LTETicket } from './generators/lteTicket'
export { LTEVenue } from './generators/lteVenue'
export { LTEPaymentGateway } from './generators/ltePaymentGateway'
export { LTEWaitlistEntry } from './generators/lteWaitlistEntry'
export { LTESponsor } from './generators/lteSponsor'
export { LTEAssignment } from './generators/lteAssignment'
export { LTEScheduleItem } from './generators/lteScheduleItem'
export { OrderApiCustomPaymentType } from './generators/orderapiCustomPaymentType'

export { decorators as ClassyDecorators } from './classy/decorators'
export { register as classyRegister } from './classy/register'

import { makeGenerate } from './generate.js'

import './mixins';

export function useDataGenerators(globalIt = global.it, globaDescribe = global.describe) {
    if (!globalIt || globalIt.generate) {
        return
    }
    globalIt.generate = makeGenerate(globalIt, globaDescribe)
}


