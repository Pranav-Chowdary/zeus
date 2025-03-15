from flask import Flask, render_template, request, redirect, url_for, flash, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'

users = {
    "jobseeker@gmail.com": {"password": "password123", "type": "jobSeeker"},
    "recruiter@gmail.com": {"password": "recruiter123", "type": "recruiter"}
}

trusted_domains = ["companydomain.com", "officialdomain.com"]

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = users.get(email)
        if user and user['password'] == password:
            session['user'] = email
            session['user_type'] = user['type']
            return redirect(url_for('home'))
        flash("Invalid email or password.", "error")

    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        user_type = request.form.get('userType')
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        email = request.form['email']
        phone = request.form['phone']
        gender = request.form['gender']
        age = request.form['age']
        business_pancard = request.form['businessPancard']
        live_picture = request.files['livePicture']
        company_name = request.form.get('companyName', None)
        company_address = request.form.get('companyAddress', None)
        employee_types = request.form.get('employeeTypes', None)
        field_of_interest = request.form.get('fieldOfInterest', None)
        max_salary = request.form.get('maxSalary', None)
        field_of_employees_need = request.form.get('fieldOfEmployeesNeed', None)

        if user_type == 'recruiter':
            email_domain = email.split('@')[1]
            if email_domain not in trusted_domains:
                flash("Please use an official company email address.", "error")
                return redirect(url_for('signup'))

            live_picture.save(f'static/uploads/{live_picture.filename}')

        users[email] = {
            "first_name": first_name,
            "last_name": last_name,
            "phone": phone,
            "gender": gender,
            "age": age,
            "business_pancard": business_pancard,
            "company_name": company_name,
            "company_address": company_address,
            "employee_types": employee_types,
            "field_of_interest": field_of_interest,
            "max_salary": max_salary,
            "field_of_employees_need": field_of_employees_need,
            "password": request.form['password'],
            "type": user_type
        }

        flash("Registration successful! Please log in.", "success")
        return redirect(url_for('login'))

    return render_template('signup.html')

@app.route('/home')
def home():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('home_page.html')

@app.route('/logout')
def logout():
    session.clear()
    flash("You have been logged out.", "success")
    return redirect(url_for('login'))

@app.route('/select-signup')
def select_signup():
    return render_template('select-signup.html')

@app.route('/job-seeker-signup', methods=['GET', 'POST'])
def job_seeker_signup():
    if request.method == 'POST':
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']

        if password != confirm_password:
            flash("Passwords do not match.", "error")
            return redirect(url_for('job_seeker_signup'))

        users[email] = {"first_name": first_name, "last_name": last_name, "type": "jobSeeker", "password": password}
        flash("Job Seeker Registration Successful!", "success")
        return redirect(url_for('login'))

    return render_template('jobseeker-signup.html')

@app.route('/recruiter-signup', methods=['GET', 'POST'])
def recruiter_signup():
    if request.method == 'POST':
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        email = request.form['email']
        business_pancard = request.form['businessPancard']
        company_name = request.form['companyName']
        company_address = request.form['companyAddress']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']

        if password != confirm_password:
            flash("Passwords do not match.", "error")
            return redirect(url_for('recruiter_signup'))

        users[email] = {
            "first_name": first_name,
            "last_name": last_name,
            "type": "recruiter",
            "business_pancard": business_pancard,
            "company_name": company_name,
            "company_address": company_address,
            "password": password
        }
        flash("Recruiter Registration Successful!", "success")
        return redirect(url_for('login'))

    return render_template('recruiter-signup.html')

if __name__ == '__main__':
    app.run(debug=True)
