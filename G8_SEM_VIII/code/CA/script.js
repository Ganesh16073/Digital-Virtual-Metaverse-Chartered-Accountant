document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('entityType').addEventListener('change', function () {
        const value = this.value;
        document.querySelectorAll('.options').forEach(option => {
            option.style.display = 'none';
        });

        if (value === 'individual') {
            document.getElementById('individual-options').style.display = 'block';
        } else if (value === 'private-ltd' || value === 'public-ltd') {
            document.getElementById('company-options').style.display = 'block';
        } else if (value === 'trust') {
            document.getElementById('trust-options').style.display = 'block';
        }
    });

    document.getElementById('taxForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const entityType = document.getElementById('entityType').value;
        const income = parseFloat(document.getElementById('income').value);
        let resultMessage = '';

        if (entityType === 'individual') {
            const age = parseInt(document.getElementById('age').value);
            const tax = calculateIndividualTax(income, age);
            resultMessage = `Individual tax calculated: ₹${tax.toFixed(2)}`;
        } else if (entityType === 'private-ltd' || entityType === 'public-ltd') {
            const turnover = parseFloat(document.getElementById('turnover').value);
            const section = document.getElementById('section').value;
            const tax = entityType === 'private-ltd' ? calculatePrivateLimitedTax(income, turnover, section) : calculatePublicLimitedTax(income, turnover, section);
            resultMessage = `${entityType === 'private-ltd' ? 'Private' : 'Public'} Limited Company tax calculated: ₹${tax.toFixed(2)}`;
        } else if (entityType === 'trust') {
            const royalty = document.getElementById('royalty').value;
            const tax = calculateTrustTax(income, royalty);
            resultMessage = `Trust tax calculated: ₹${tax.toFixed(2)}`;
        } else if (entityType === 'partnership') {
            const tax = calculatePartnershipTax(income);
            resultMessage = `Partnership Firm tax calculated: ₹${tax.toFixed(2)}`;
        } else {
            resultMessage = 'Invalid entity type.';
        }

        localStorage.setItem('resultMessage', resultMessage);
        window.location.href = 'result.html';
    });

    function calculateIndividualTax(income, age) {
        let tax = 0;
        if (age < 60) {
            if (income <= 300000) tax = 0;
            else if (income <= 600000) tax = (income - 300000) * 0.05;
            else if (income <= 900000) tax = 15000 + (income - 600000) * 0.1;
            else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
            else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.2;
            else tax = 150000 + (income - 1500000) * 0.3;
        } else if (age < 80) {
            if (income <= 300000) tax = 0;
            else if (income <= 600000) tax = (income - 300000) * 0.05;
            else if (income <= 900000) tax = 15000 + (income - 600000) * 0.1;
            else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
            else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.2;
            else tax = 150000 + (income - 1500000) * 0.3;
        } else {
            if (income <= 300000) tax = 0;
            else if (income <= 600000) tax = (income - 300000) * 0.05;
            else if (income <= 900000) tax = 15000 + (income - 600000) * 0.1;
            else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
            else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.2;
            else tax = 150000 + (income - 1500000) * 0.3;
        }
        return tax;
    }

    function calculateTrustTax(income, royalty) {
        const royaltyTaxRate = 0.5;  // 50% for royalty income
        const otherIncomeTaxRate = 0.4;  // 40% for other income
        return royalty === "yes" ? income * royaltyTaxRate : income * otherIncomeTaxRate;
    }

    function calculatePartnershipTax(income) {
        let tax = 0;
        const taxSlabs = [
            { slab: 300000, rate: 0 },
            { slab: 300000, rate: 0.05 },
            { slab: 300000, rate: 0.1 },
            { slab: 300000, rate: 0.15 },
            { slab: 300000, rate: 0.2 },
            { slab: Infinity, rate: 0.3 }
        ];
        for (const { slab, rate } of taxSlabs) {
            if (income <= slab) {
                tax += income * rate;
                break;
            } else {
                tax += slab * rate;
                income -= slab;
            }
        }
        return tax;
    }

    function calculatePrivateLimitedTax(income, turnover, section) {
        if (turnover <= 400000000) return income * 0.25;
        switch (section) {
            case "115BA": return income * 0.25;
            case "115BAA": return income * 0.22;
            case "115BAB": return income * 0.15;
            default: return income * 0.3;
        }
    }

    function calculatePublicLimitedTax(income, turnover, section) {
        if (turnover <= 400000000) return income * 0.25;
        switch (section) {
            case "115BA": return income * 0.25;
            case "115BAA": return income * 0.22;
            case "115BAB": return income * 0.15;
            default: return income * 0.3;
        }
    }
});
