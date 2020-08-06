/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class SeaServiceTime extends Contract {
    // ==================== Contract public functions  ====================
    async createRecord(ctx, _name, _dateOfBirth, _cdn) {
        console.info(
            "============= [SeaServiceContract-START] : Creating Record ==========="
        );

        const serviceTimeReord = {
            name: _name,
            dateOfBirth: _dateOfBirth,
            cdn: _cdn,
            recordId: _name.replace(" ", "").concat(_cdn),
            seaTime: "00",
            status: "GRAD",
            rank: "nCadet",
            dateReg: String(new Date()),
        };

        await ctx.stub.putState(
            recordId,
            Buffer.from(JSON.stringify(serviceTimeReord))
        );
        console.info(
            "============= [SeaServiceContract-END] : Creating Record ==========="
        );
    }

    async queryServiceTime(ctx, _recordId) {
        console.info(
            "============= [SeaServiceContract-START] : Query Record ==========="
        );
        console.info(`My Params:${_recordId}`);
        const recordAsBytes = await ctx.stub.getState(_recordId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${_recordId} does not exist`);
        }
        console.log(recordAsBytes.toString());
        return recordAsBytes.toString();
    }
    // ====================  ====================  ====================
}

module.exports = SeaServiceTime;
