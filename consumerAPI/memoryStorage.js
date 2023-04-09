/**
 * @var {MemoryStorage}
 */
let instance;

/**
 * Storage for reports
 */
class MemoryStorage {
    /**
     * Init storage
     */
    constructor() {
        this.reports = [];
    }

    /**
     * Add report to storage
     * @param {Report} report 
     */
    add(report) {
        this.reports.push(report);
    }

    /**
     * Get all reports
     * @returns {Report[]}
     */
    get() {
        return this.reports;
    }
    
}
/**
 * 
 * @returns {MemoryStorage}
 */
MemoryStorage.getInstance = function() {
    if (!instance) {
        const ms = new MemoryStorage();
        instance = ms;
    }
    return instance;
}

module.exports = MemoryStorage;