default: ui jest

ui:
	xcodebuild test -project ios/remindr.xcodeproj -scheme remindr -destination 'platform=iOS Simulator,name=iPhone 6'
jest:
	npm run travis -- --maxWorkers=1
