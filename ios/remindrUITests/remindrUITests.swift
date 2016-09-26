import XCTest

class remindrUITests: XCTestCase {
  let app = XCUIApplication()
  
  override func setUp() {
    super.setUp()
    continueAfterFailure = false
    XCUIApplication().launch()
  }
    
  override func tearDown() {
    super.tearDown()
  }
    
  func testAddTask() {
    let addTaskInput = app.textFields["Add Task"]
    addTaskInput.tap()
    addTaskInput.typeText("123456")
    app.buttons["Return"].tap()
    
    XCTAssert(app.otherElements["Task"].staticTexts["123456"].exists)
  }

}
