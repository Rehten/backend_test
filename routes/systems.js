var express = require('express');
var router = express.Router();

const SeverityEnum = {
    Low: 0,
    Medium: 1,
    High: 2,
    Critical: 3
};

const StateEnum = {
    Open: 0,
    Waiting: 1,
    Disabled: 2,
    Closed: 3
};

class System {
    constructor(name, createdAt, id, severity, state, defects) {
        this.name = name;
        this.createdAt = createdAt;
        this.id = id;
        this.severity = severity;
        this.state = state;
        this.defects = defects;
    }
}
const rnd = () => Number(Math.round(Math.random() * 3));
const sysRnd = () => (Number(Math.round(Math.random() * 7)) + 1);

const systems = Array(1000).fill(null).map((e, i, arr) => {
    return new System(`System${sysRnd()}`, new Date() - i * 10000, i + 1, rnd(), rnd(), );
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    let rslt = systems;
    const {page, pageSize, name, severity, state} = req.query;

    if (name) {
        rslt = rslt.filter(system => system.name === name);
    }

    if (severity) {
        rslt = rslt.filter(system => Number(system.severity) === Number(severity));
    }

    if (state) {
        rslt = rslt.filter(system => Number(system.state) === Number(state));
    }

    const total = rslt.length;

    if (page && pageSize) {
        rslt = rslt.slice((page - 1) * pageSize, page * pageSize);
    }

    res.json({
        data: rslt,
        total,
    });
});

router.get('/:id', function(req, res, next) {
    res.json({
        data: systems.find(system => Number(system.id) === Number(req.params.id))
    });
});

module.exports = router;