//
//  App.swift
//  Mobile Video Loop
//
//  Created by Andrew C Wang on 12/11/21.
//

import SwiftUI

public let UserDefaultSuiteName = "group.us.hearye.Tarda"

@main
struct MobileVideoLoopApp: App {
    @Environment(\.scenePhase) var scenePhase

    @UIApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate
    
    init() {}
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
