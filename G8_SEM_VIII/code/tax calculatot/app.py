from flask import Flask, render_template, request

app = Flask(__name__)

# Tax calculation functions
def calculate_individual_tax(income, age):
    tax = 0
    if age < 60:
        if income <= 300000:
            tax = 0
        elif income <= 600000:
            tax = (income - 300000) * 0.05
        elif income <= 900000:
            tax = 15000 + (income - 600000) * 0.1
        elif income <= 1200000:
            tax = 45000 + (income - 900000) * 0.15
        elif income <= 1500000:
            tax = 90000 + (income - 1200000) * 0.2
        else:
            tax = 150000 + (income - 1500000) * 0.3
    elif 60 <= age < 80:
        if income <= 300000:
            tax = 0
        elif income <= 600000:
            tax = (income - 300000) * 0.05
        elif income <= 900000:
            tax = 15000 + (income - 600000) * 0.1
        elif income <= 1200000:
            tax = 45000 + (income - 900000) * 0.15
        elif income <= 1500000:
            tax = 90000 + (income - 1200000) * 0.2
        else:
            tax = 150000 + (income - 1500000) * 0.3
    else:
        if income <= 300000:
            tax = 0
        elif income <= 600000:
            tax = (income - 300000) * 0.05
        elif income <= 900000:
            tax = 15000 + (income - 600000) * 0.1
        elif income <= 1200000:
            tax = 45000 + (income - 900000) * 0.15
        elif income <= 1500000:
            tax = 90000 + (income - 1200000) * 0.2
        else:
            tax = 150000 + (income - 1500000) * 0.3
    return tax

def calculate_trust_tax(income, royalty):
    royalty_tax_rate = 0.5  # 50% for royalty income
    other_income_tax_rate = 0.4  # 40% for other income
    if royalty == "yes":
        tax = income * royalty_tax_rate
    else:
        tax = income * other_income_tax_rate
    return tax

def calculate_partnership_tax(income):
    tax = 0
    tax_slabs = [
        {"slab": 300000, "rate": 0},  # Up to ₹ 3,00,000
        {"slab": 300000, "rate": 0.05},  # ₹ 3,00,001 - ₹ 6,00,000
        {"slab": 300000, "rate": 0.1},  # ₹ 6,00,001 - ₹ 9,00,000
        {"slab": 300000, "rate": 0.15},  # ₹ 9,00,001 - ₹ 12,00,000
        {"slab": 300000, "rate": 0.2},  # ₹ 12,00,001 - ₹ 15,00,000
        {"slab": float("inf"), "rate": 0.3}  # Above ₹ 15,00,000
    ]
    for slab_data in tax_slabs:
        slab, rate = slab_data["slab"], slab_data["rate"]
        if income <= slab:
            tax += income * rate
            break
        else:
            tax += slab * rate
            income -= slab
    return tax

def calculate_private_limited_tax(income, turnover, section):
    tax = 0
    if turnover <= 400000000:
        tax = income * 0.25  # 25% tax rate
    else:
        if section == "115BA":
            tax = income * 0.25  # 25% tax rate
        elif section == "115BAA":
            tax = income * 0.22  # 22% tax rate
        elif section == "115BAB":
            tax = income * 0.15  # 15% tax rate
        else:
            tax = income * 0.3  # 30% tax rate
    return tax

def calculate_public_limited_tax(income, turnover, section):
    tax = 0
    if turnover <= 400000000:
        tax = income * 0.25  # 25% tax rate
    else:
        if section == "115BA":
            tax = income * 0.25  # 25% tax rate
        elif section == "115BAA":
            tax = income * 0.22  # 22% tax rate
        elif section == "115BAB":
            tax = income * 0.15  # 15% tax rate
        else:
            tax = income * 0.3  # 30% tax rate
    return tax

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    entity_type = request.form.get('entityType')
    income = float(request.form.get('income', 0))
    result = {}

    if entity_type == 'individual':
        age = int(request.form.get('age', 0))
        tax = calculate_individual_tax(income, age)
        result['message'] = f'Individual tax calculated: ₹{tax:.2f}'
    elif entity_type == 'private-ltd':
        turnover = float(request.form.get('turnover', 0))
        section = request.form.get('section', '')
        tax = calculate_private_limited_tax(income, turnover, section)
        result['message'] = f'Private Limited Company tax calculated: ₹{tax:.2f}'
    elif entity_type == 'public-ltd':
        turnover = float(request.form.get('turnover', 0))
        section = request.form.get('section', '')
        tax = calculate_public_limited_tax(income, turnover, section)
        result['message'] = f'Public Limited Company tax calculated: ₹{tax:.2f}'
    elif entity_type == 'trust':
        royalty = request.form.get('royalty', 'no')
        tax = calculate_trust_tax(income, royalty)
        result['message'] = f'Trust tax calculated: ₹{tax:.2f}'
    elif entity_type == 'partnership':
        tax = calculate_partnership_tax(income)
        result['message'] = f'Partnership Firm tax calculated: ₹{tax:.2f}'
    else:
        result['message'] = 'Invalid entity type.'

    return render_template('result.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)
