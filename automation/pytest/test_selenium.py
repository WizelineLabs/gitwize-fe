# Generated by Selenium IDE
import pytest
import time
import json
import re
import os
from sys import platform
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options 
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


class TestAcceptance():
  def setup_method(self, method):
    o =  webdriver.ChromeOptions()
    o.add_argument('--disable-application-cache')
    o.add_argument("--incognito") 
    if platform != "darwin":
      o.add_argument('--headless')
      o.add_argument('--no-sandbox')
    o.add_argument('--single-process')
    o.add_argument('--disable-dev-shm-usage')
    #driver = webdriver.Chrome(options=chrome_options)
    self.driver = webdriver.Chrome(ChromeDriverManager().install(),chrome_options=o)
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_acceptance(self):
    
    self.driver.get("https://qa.gitwize.net/")
    self.driver.set_window_size(1280, 711)
    
    wait = WebDriverWait(self.driver, 20)
    username = os.environ['AUTOMATION_USER']
    password = os.environ['AUTOMATION_PASSWORD']
    repo_url = os.environ['AUTOMATION_REPO']
    repo_token = os.environ['AUTOMATION_TOKEN']

    wait.until(EC.element_to_be_clickable((By.XPATH,"//button[./span[text()='Get Started']]"))).click()
    wait.until(EC.element_to_be_clickable((By.ID, "okta-signin-username"))).send_keys(username)
    wait.until(EC.element_to_be_clickable((By.ID, "okta-signin-password"))).send_keys(password)
    wait.until(EC.element_to_be_clickable((By.ID, "okta-signin-submit"))).click()
    try:
      element = wait.until(EC.visibility_of_element_located((By.XPATH, "//*[text()='knewz-support']")))
    except TimeoutException:
      print ("test repo not found, need to create.")
      wait.until(EC.element_to_be_clickable((By.XPATH,"//button[./span[text()='Add repository']]"))).click()
      wait.until(EC.element_to_be_clickable((By.ID, "projectUrl"))).send_keys(repo_url)
      wait.until(EC.element_to_be_clickable((By.ID, "password"))).click()
      wait.until(EC.element_to_be_clickable((By.ID, "password"))).send_keys(repo_token)
      wait.until(EC.element_to_be_clickable((By.XPATH,"//button[./span[text()='Add to list']]"))).click()
      wait.until(EC.element_to_be_clickable((By.XPATH,"//strong[text()='knewz-support']")))
      element = wait.until(EC.visibility_of_element_located((By.XPATH, "//*[text()='knewz-support']")))
    divs = element.find_elements_by_xpath( "//div[contains(@class, 'MuiCardContent-root-')]")
    
    for item in divs:
      repos  = item.find_elements_by_xpath("//a/p[text()='knewz-support']")
      if (len(repos) > 0):
        svgs = item.find_elements_by_xpath(".//*[contains(@class, 'MuiSvgIcon-root')]")
        if(len(svgs) > 0):
          svgs[1].click()
          wait.until(EC.element_to_be_clickable((By.XPATH,"//button[./span[text()='OK']]"))).click()
          time.sleep(5) 
          print ("test is successful.")
          break
  
    
