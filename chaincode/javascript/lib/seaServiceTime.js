/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");
const ranks = ["Master Mariner", "Chief Mate", "Watchkeeping Mate", "Cadet"];

class SeaServiceTime extends Contract {
    // ==================== Contract public functions  ====================
    async createRecord(ctx, _name, _dateOfBirth, _cdn) {
        console.info(
            "============= [SeaServiceContract-START] : Creating Record ==========="
        );
        console.info(
            `[SeaServiceContract-createRecord]: creating records with params
            _name:${_name} | _dateOfBirth:${_dateOfBirth} | __cdn:${_cdn}`
        );

        const serviceTimeRecord = {
            name: _name,
            dateOfBirth: _dateOfBirth,
            cdn: _cdn,
            recordId: _name.replace(" ", "").concat(_cdn),
            seaTime: "00",
            status: "GRAD",
            rank: "Cadet",
            dateReg: String(new Date()),
            serviceTimes: [],
        };

        await ctx.stub.putState(
            serviceTimeRecord.recordId,
            Buffer.from(JSON.stringify(serviceTimeRecord))
        );
        console.info(
            "============= [SeaServiceContract-END] : Creating Record ==========="
        );
    }

    async queryServiceTime(ctx, _recordId) {
        console.info(
            "============= [SeaServiceContract-START] : Query Record ==========="
        );
        console.info(
            `[SeaServiceContract-queryServiceTime]: query record with params
            _recordId:${_recordId}`
        );

        const recordAsBytes = await ctx.stub.getState(_recordId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${_recordId} does not exist`);
        }
        console.log(recordAsBytes.toString());
        return recordAsBytes.toString();
    }

    async addServiceTime(
        ctx,
        _recordId,
        _vesselOwner,
        _vesselNo,
        _dateSignIn,
        _dateSignOff,
        _time
    ) {
        ("============= [SeaServiceContract-START] : Adding service time ===========");
        console.info(
            `[SeaServiceContract-addServiceTime]: Adding service time with params
            _recordId:${_recordId} | _vesselOwner:${_vesselOwner} | _vesselNo:${_vesselNo}
            _dateSignIn:${_dateSignIn} | _dateSignOff:${_dateSignOff} | _time:${_time}`
        );

        const tmpRecord = {
            _vesselOwner,
            _vesselNo,
            _dateSignIn,
            _dateSignOff,
            _time,
        };

        const recordAsBytes = await ctx.stub.getState(_recordId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${_recordId} does not exist`);
        }
        const record = JSON.parse(recordAsBytes.toString());
        record.seaTime = String(parseInt(_time) + parseInt(record.seaTime));
        record.serviceTimes.push(tmpRecord);

        await ctx.stub.putState(_recordId, Buffer.from(JSON.stringify(record)));

        ("============= [SeaServiceContract-END] : Adding service time ===========");
    }

    async promoteCandidate(ctx, _recordId, _newRank) {
        console.info(
            "============= [SeaServiceContract-START] : Promote Candidate ==========="
        );
        console.info(
            `[SeaServiceContract-queryServiceTime]: Promote candidate with params
            _recordId:${_recordId} | _newRank:${_newRank}`
        );
        if (!ranks.includes(_newRank)) {
            throw new Error(`${_newRank} is not valid a rank`);
        }

        const recordAsBytes = await ctx.stub.getState(_recordId);
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${_recordId} does not exist`);
        }
        const record = JSON.parse(recordAsBytes.toString());
        record.rank = _newRank;

        await ctx.stub.putState(_recordId, Buffer.from(JSON.stringify(record)));

        console.info(
            "============= [SeaServiceContract-END] : Promote Candidate ==========="
        );
    }
    // ====================  ====================  ====================

    async initLedger(ctx) {
        console.info(
            "============= [SeaServiceContract-START] : Creating sample Data ==========="
        );
        const sampleRecord1 = {
            name: "Majid Shockoohi",
            dateOfBirth: "1984/04/28",
            cdn: "CDN123456789",
            recordId: "Majid Shockoohi".replace(" ", "").concat("CDN123456789"),
            seaTime: "00",
            status: "GRAD",
            rank: "Cadet",
            dateReg: String(new Date()),
            serviceTimes: [],
        };

        const sampleRecord2 = {
            name: "Jack Sparrow",
            dateOfBirth: "1800/04/28",
            cdn: "CDN987654321",
            recordId: "Jack Sparrow".replace(" ", "").concat("CDN987654321"),
            seaTime: "200",
            status: "RETIRED",
            rank: "Master Mariner",
            dateReg: String(new Date()),
            serviceTimes: [],
        };

        await ctx.stub.putState(
            sampleRecord1.recordId,
            Buffer.from(JSON.stringify(sampleRecord1))
        );
        await ctx.stub.putState(
            sampleRecord2.recordId,
            Buffer.from(JSON.stringify(sampleRecord2))
        );

        console.info(
            "============= [SeaServiceContract-END] : Creating sample Data ==========="
        );
    }
}

module.exports = SeaServiceTime;
