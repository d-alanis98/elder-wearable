"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PanicAlert {
    constructor(location) {
        this.toPrimitives = () => ({
            location: this.location.toPrimitives(),
        });
        this.location = location;
    }
}
exports.default = PanicAlert;
