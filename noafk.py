import pyautogui
import time

while True:
    # Move to (100, 100) and click
    pyautogui.moveTo(100, 100)
    pyautogui.click()
    # Wait for a few seconds before moving to the next position
    time.sleep(2)

    # Move to (200, 200) and click
    pyautogui.moveTo(200, 200)
    pyautogui.click()
    # Wait for a few seconds before repeating
    time.sleep(2)
