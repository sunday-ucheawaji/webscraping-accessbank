from app.account_scraper import Account


def runner(username, password):
    try:
        with Account() as bot:
            bot.landing_page()
            try:
                bot.login_with_credentials(username, password)
            except Exception as e:
                str(e)
            else:
                bot.proceed()
                account_details = bot.get_account_details()

                bot.generate_account_statement()
                bot.account_statement(
                    account_details['Account Number'],
                    account_details['Account Name'],
                    account_details['Account Balance']
                )
            
                try:
                    bot.no_transaction_found()
                    return {"message": "No transaction found for the past 60 days"}
                except Exception as e:
                    str(e)
                try:
                    bot.filter_by_days(60)
                    bot.my_report()
                    bot.logout()
                except Exception as e:
                    str(e)
                else:
                    return {"message": "Successfully Dowloaded the report in the current folder"}
    
    except Exception as e:
        if 'in PATH' in str(e):
            print(
                'You are trying to run the bot from command line \n'
                'Please add to PATH your Selenium Drivers \n'
                'Windows: \n'
                '    set PATH=%PATH%;C:path-to-your-folder \n \n'
                'Linux: \n'
                '    PATH=$PATH:/path/toyour/folder/ \n'
            )
        else:
            raise