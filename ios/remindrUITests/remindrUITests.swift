//
//  remindrUITests.swift
//  remindrUITests
//
//  Created by Miles on 25/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

class remindrUITests: XCTestCase {

  override func setUp() {
    super.setUp()
    continueAfterFailure = false
    XCUIApplication().launch()
  }
    
  override func tearDown() {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    super.tearDown()
  }
    
  func testExample() {
    
    let app = XCUIApplication()
    
    app.textFields["add-task-input"].tap()
    app.typeText("Hello world \r")
    
//    XCTAssertEqual("lorem", "lorem", "lorem !== lorem")
    
    
  }
}
