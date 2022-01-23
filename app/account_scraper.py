from selenium import webdriver
import os
from openpyxl import Workbook
from selenium.webdriver.common.by import By  
from selenium.webdriver.support import expected_conditions as EC


class Account(webdriver.Chrome):

    def __init__(self, driver_path= r"C:/Users/macair/Desktop/SeleniumDrivers", teardown = False):
        self.driver_path = driver_path
        self.teardown = teardown
        os.environ["PATH"] += self.driver_path
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        super(Account, self).__init__(options=options)
        self.implicitly_wait(30)
        self.maximize_window()

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.teardown:
            self.quit()

    def landing_page(self):
        self.get('https://ibank.accessbankplc.com/RetailBank/#/')

    def login_with_credentials(self, username, password):
        username_button = self.find_element(By.ID, 'username')
        username_button.clear()
        username_button.send_keys(username)
        continue_button = self.find_element(By.ID, 'BW_button_802163')
        continue_button.click()
        password_button = self.find_element(By.ID, 'password')
        password_button.clear()
        password_button.send_keys(password)
        login_button = self.find_element(By.ID, 'BW_button_802163_2')
        login_button.click()

    def proceed(self):
        proceed_button = self.find_element(By.ID, 'BW_button_022485')
        proceed_button.click()

    def get_account_details(self):
        account_option_button = self.find_element(By.CSS_SELECTOR, 'div[translate="NAVIGATION.MY_ACCOUNTS"]')
        account_option_button.click()
        account_name = self.find_element(
            By.CSS_SELECTOR,
            'span[ui-sref="commonAccountdetails({summaryaccid:account.id})"]'
        ).text
        account_number = self.find_element(
            By.CSS_SELECTOR,
            'span[class="acc_value ng-binding"]'
        ).text
        account_balance = self.find_element(
            By.CSS_SELECTOR,
            'span[class="acc_balance ng-binding"]').text
        return {'Account Name': account_name, 'Account Number': account_number, 'Account Balance': account_balance}

    def generate_account_statement(self):
        self.back()
        self.find_element(By.CSS_SELECTOR, 'div[translate="NAVIGATION.MY_STATEMENT"]').click()

    def account_statement(self, account_number, account_name, account_balance):
        account_statement_button = self.find_element(By.CSS_SELECTOR, 'span[class="menu-text ng-binding"]')
        account_statement_button.click()
        dropdown_button = self.find_element(By.ID, 'BW_select_378233')
        dropdown_button.click()
        select = self.find_element(By.ID, "BW_select_378233")
        select.find_element(
            By.CSS_SELECTOR,
            f'option[label="{account_number} - {account_name} > {account_balance}"]').click()

    def no_transaction_found(self):
        self.find_element(
            By.CSS_SELECTOR,
            'button[class="btn_normal normal_with_border pull-right btn-arrow ng-binding"]'
        ).click()

    def filter_by_days(self, days):
        self.find_element(By.CSS_SELECTOR, f'input[value="last {str(days)} days"]').click()

    
    def my_report(self):
        export_button = self.find_element(By.CSS_SELECTOR, 'input[id="btn_export"]').click()
        excel_option= self.find_element(By.CSS_SELECTOR, 'a[id="BW_button_866824"]').click()
        self.find_element(By.ID, 'BW_button_925330').click()
        try:
            close_button= self.find_element(By.CSS_SELECTOR, 'button[id="BW_button_453668"]').click()
        except Exception as e:
            str(e)
            
    def excel_sheet(self, arr):
        wb = Workbook()
        ws = wb.active
        ws.title = "bank transaction"
        for item in arr:
            ws.append(item)
        wb.save('bank_report.xlsx')
        print('excel sheet printed')

    def logout(self):
        self.find_element(By.CSS_SELECTOR, 'a[class="logout-icon ng-scope ng-binding"]').click()
        self.find_element(By.CSS_SELECTOR, 'a[id="BW_click_cancel_feedback"]').click()

