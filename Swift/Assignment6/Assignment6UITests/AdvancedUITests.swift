/*
 * Copyright (C) 2022-2023 David C. Harrison. All right reserved.
 *
 * You may not use, distribute, publish, or modify this code without
 * the express written permission of the copyright holder.
 */

/*
 * The grading system does not simply check the pass/fail of these test; it also
 * checks the contents of the database after each excution to ensure correct
 * functionality.
 */

import XCTest

final class AdvancedUITests: XCTestCase {
  
    // Each comment block defines a test you need to write, but you can write others
    
    // Change these to your UCSC email, student number and name
    static private var email = "snlarsen@ucsc.edu"
    static private var passwd = "1766364"
    
    private var app: XCUIApplication!
    
    override func setUpWithError() throws {
      try super.setUpWithError()
      continueAfterFailure = false
      app = XCUIApplication()
      app.launchEnvironment = ["animations": "0"]
      app.launch()
    }
    
    private func waitFor(_ element : XCUIElement, timeout: Double = 5.0) -> XCUIElement {
      let expectation = expectation(
        for: NSPredicate(format: "exists == true"),
        evaluatedWith: element,
        handler: .none
      )
      let _ = XCTWaiter.wait(for: [expectation], timeout: timeout)
      return element
    }
    
    private func login(_ email: String = email, _ passwd: String = passwd) {
      let field = app.textFields["EMail"]
      field.tap()
      for char in email {
        field.typeText(String(char))
      }
      let password = app.secureTextFields["Password"]
      password.tap()
      for char in passwd {
        password.typeText(String(char))
      }
      app.buttons["Login"].tap()
    }
    
    private func swipeAndPress(content: String, action: String) {
        let element = app.staticTexts[content]
        if element.exists {
          element.swipeLeft()
          let button = app.buttons[action]
          if button.exists {
            button.tap()
          }
        }
    }
    
    private func AddWorkspace(title: String, proceed: String) {
        login()
        app.navigationBars["Workspaces"].buttons["New Workspace"].tap()
        let name = app.textFields["Name"]
        name.tap()
        name.typeText(title)
        app.buttons[proceed].tap()
    }
  
    /*
    * Log in
    * Add a workspace
    * Assert workspace exists
    */
    func testAddWorkspace() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        AddWorkspace(title: content, proceed: "OK")
        XCTAssert(app.staticTexts[content].waitForExistence(timeout: 5))
    }
    
  
    /*
    * Log in
    * Add a workspace
    * Press reset
    * Assert workspace no longer exists
    */
    func testAddWorkspaceReset() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        AddWorkspace(title: content, proceed: "OK")
        app.navigationBars["Workspaces"].buttons["Reset"].tap()
        XCTAssertFalse(app.staticTexts[content].waitForExistence(timeout: 5))
    }
    /*
    * Log in
    * Start to add a workspace
    * Cancel
    */
    func testAddWorkspaceCancel() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        AddWorkspace(title: content, proceed: "Cancel")
        XCTAssert(waitFor(app.navigationBars["Workspaces"]).exists)
    }
  
  /*
   * Log in
   * Add a workspace
   * Assert workspace exists
   * Delete the workspace
   * Assert workspace does not exist
   */
    func testAddWorkspaceDelete() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        AddWorkspace(title: content, proceed: "OK")
        swipeAndPress(content: content, action: "Delete")
        XCTAssertFalse(app.staticTexts[content].waitForExistence(timeout: 10))
    }
    
    private func AddChannel(title: String, proceed: String) {
        login()
        waitFor(app.collectionViews.buttons["Student Workspace"]).tap()
        app.navigationBars["Student Workspace"].buttons["New Channel"].tap()
        let name = app.textFields["Name"]
        name.tap()
        name.typeText(title)
        app.buttons[proceed].tap()
    }
  
  /*
   * Log in
   * Select a workspace
   * Add a channel
   * Assert channel exists
   */
    func testAddChannel() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        AddChannel(title: content, proceed: "OK")
        XCTAssert(app.staticTexts[content].waitForExistence(timeout: 5))
    }
  
  /*
   * Log in
   * Select a workspace
   * Start to add a channel
   * Cancel
   */
    func testAddChannelCancel() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        AddChannel(title: content, proceed: "Cancel")
        XCTAssert(waitFor(app.navigationBars["Student Workspace"]).exists)
    }
  
  /*
   * Log in
   * Select a workspace
   * Add a channel
   * Assert channel exists
   * Delete the channel
   * Assert channel does not exist
   */
    func testAddChannelDelete() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        AddChannel(title: content, proceed: "OK")
        swipeAndPress(content: content, action: "Delete")
        XCTAssertFalse(app.staticTexts[content].waitForExistence(timeout: 5))
    }
    
    private func scrollToName(name: String) {
        while(!(app.staticTexts[name].exists)) {
            app.swipeUp()
        }
    }
    
    private func addMember(name: String) {
        app.navigationBars["Members"].buttons["Add Member"].tap()
        scrollToName(name: name)
        swipeAndPress(content: name, action: "Add")
    }
    
    private func Members(content: String) {
        AddWorkspace(title: content, proceed: "OK")
        XCTAssert(app.staticTexts[content].waitForExistence(timeout: 5))
        waitFor(app.collectionViews.buttons[content]).tap()
        XCTAssert(waitFor(app.navigationBars[content]).exists)
        app.navigationBars[content].buttons["Add Members"].tap()
        XCTAssert(waitFor(app.navigationBars["Members"]).exists)
    }
  
  /*
   * Log in
   * Add a workspace
   * Select the workspace
   * Add Molly Member and Anna Admin as members
   * Assert Molly and Anna are members of the workspace
   */
    func testAddMembers() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        Members(content: content)
        addMember(name: "Anna Admin")
        XCTAssert(waitFor(app.navigationBars["Members"]).exists)
        XCTAssert(app.staticTexts["Anna Admin"].waitForExistence(timeout: 5))
        addMember(name: "Molly Member")
        XCTAssert(waitFor(app.navigationBars["Members"]).exists)
        XCTAssert(app.staticTexts["Anna Admin"].waitForExistence(timeout: 5))
    }
  
  /*
   * Log in
   * Add a workspace
   * Select the workspaca
   * Add William Shakespeare as a member
   * Assert Will is a member of the workspace
   * Remove Will as a member
   * Assert Will is no longer a member of the workspace
   */
    func testWillMemberDelete() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        Members(content: content)
        addMember(name: "William Shakespeare")
        XCTAssert(waitFor(app.navigationBars["Members"]).exists)
        XCTAssert(app.staticTexts["William Shakespeare"].waitForExistence(timeout: 5))
        swipeAndPress(content: "William Shakespeare", action: "Delete")
        XCTAssertFalse(app.staticTexts["William Shakespeare"].waitForExistence(timeout: 5))
    }
  
  /*
   * Log in
   * Add a workspace
   * Select the workspace
   * Add William Shakespeare as a member
   * Log out
   * Log in as will@cse118.com password "will"
   * Assert workspace is visiable
   */
    func testWillLogoutLogin() throws {
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        Members(content: content)
        addMember(name: "William Shakespeare")
        XCTAssert(waitFor(app.navigationBars["Members"]).exists)
        app.navigationBars["Members"].buttons[content].tap()
        app.navigationBars[content].buttons["Workspaces"].tap()
        XCTAssert(waitFor(app.navigationBars["Workspaces"]).exists)
        app.navigationBars["Workspaces"].buttons["Logout"].tap()
        login("will@cse118.com", "will")
        XCTAssert(app.staticTexts[content].waitForExistence(timeout: 5))
    }
  
  /*
   * Log in
   * Add a workspace
   * Select the workspace
   * Add William Shakespeare as a member
   * Add a channel
   * Log out
   * Log in as will@cse118.com password "will"
   * Select the workspace
   * Select the channel
   * Add a new message
   * Assert message is visible
   */
    func testLoginWillMessage() throws {
        // add member
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        Members(content: content)
        addMember(name: "William Shakespeare")
        XCTAssert(waitFor(app.navigationBars["Members"]).exists)
        app.navigationBars["Members"].buttons[content].tap()
        // add channel
        XCTAssert(waitFor(app.navigationBars[content]).exists)
        app.navigationBars[content].buttons["New Channel"].tap()
        let title = "New @ \(Date().description)"
        let name = app.textFields["Name"]
        name.tap()
        name.typeText(title)
        app.buttons["OK"].tap()
        XCTAssert(app.staticTexts[title].waitForExistence(timeout: 5))
        // backout
        XCTAssert(waitFor(app.navigationBars[content]).exists)
        app.navigationBars[content].buttons["Workspaces"].tap()
        XCTAssert(waitFor(app.navigationBars["Workspaces"]).exists)
        app.navigationBars["Workspaces"].buttons["Logout"].tap()
        // login
        login("will@cse118.com", "will")
        // tap workspace
        waitFor(app.collectionViews.buttons[content]).tap()
        // tap channel
        waitFor(app.collectionViews.buttons[title]).tap()
        XCTAssert(waitFor(app.navigationBars[title]).exists)
        // add message
        app.navigationBars[title].buttons["New Message"].tap()
        let text = "New @ \(Date().description)"
        let message = app.textViews["Message"]
        message.tap()
        message.typeText(text)
        app.buttons["OK"].tap()
        XCTAssert(app.staticTexts[text].waitForExistence(timeout: 5))
    }
  
  /*
   * Log in
   * Add a workspace
   * Select the workspace
   * Add William Shakespeare as a member
   * Add a channel
   * Add a new message
   * Log out
   * Log in as will@cse118.com password "will"
   * Select the workspace
   * Select the channel
   * Assert message cannot be deleted
   */
    func testFailWillDeleteMessage() throws {
        // add member
        let pre = "Soren \(Date().description)"
        let content = String(pre.prefix(32))
        Members(content: content)
        addMember(name: "William Shakespeare")
        XCTAssert(waitFor(app.navigationBars["Members"]).exists)
        app.navigationBars["Members"].buttons[content].tap()
        // add channel
        XCTAssert(waitFor(app.navigationBars[content]).exists)
        app.navigationBars[content].buttons["New Channel"].tap()
        let title = "New @ \(Date().description)"
        let name = app.textFields["Name"]
        name.tap()
        name.typeText(title)
        app.buttons["OK"].tap()
        XCTAssert(app.staticTexts[title].waitForExistence(timeout: 5))
        // tap and add message to channel
        waitFor(app.collectionViews.buttons[title]).tap()
        XCTAssert(waitFor(app.navigationBars[title]).exists)
        app.navigationBars[title].buttons["New Message"].tap()
        let text = "New @ \(Date().description)"
        let message = app.textViews["Message"]
        message.tap()
        message.typeText(text)
        app.buttons["OK"].tap()
        XCTAssert(app.staticTexts[text].waitForExistence(timeout: 5))
        // backout
        XCTAssert(waitFor(app.navigationBars[title]).exists)
        app.navigationBars[title].buttons[content].tap()
        XCTAssert(waitFor(app.navigationBars[content]).exists)
        app.navigationBars[content].buttons["Workspaces"].tap()
        XCTAssert(waitFor(app.navigationBars["Workspaces"]).exists)
        app.navigationBars["Workspaces"].buttons["Logout"].tap()
        // login
        login("will@cse118.com", "will")
        // navigate to message
        waitFor(app.collectionViews.buttons[content]).tap()
        waitFor(app.collectionViews.buttons[title]).tap()
        XCTAssert(waitFor(app.navigationBars[title]).exists)
        XCTAssert(app.staticTexts[text].waitForExistence(timeout: 5))
        // delete message
        let element = app.staticTexts[text]
        if element.exists {
            element.swipeLeft()
            let button = app.buttons["Delete"]
            XCTAssertFalse(button.exists)
        }
    }
    
    // reset workspaces to ensure a clean run
    func test0() throws {
        login()
        XCTAssert(waitFor(app.navigationBars["Workspaces"]).exists)
        app.navigationBars["Workspaces"].buttons["Reset"].tap()
        XCTAssert(waitFor(app.navigationBars["Workspaces"]).exists)
    }
}
