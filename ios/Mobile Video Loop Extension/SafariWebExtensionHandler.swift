//
//  SafariWebExtensionHandler.swift
//  Mobile Video Loop Extension
//
//  Created by Andrew C Wang on 11/20/21.
//

import SafariServices
import UIKit
import os.log

public let UserDefaultSuiteName = "group.us.hearye.Tarda"

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey]
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as! CVarArg)

        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: [ "simple": UserDefaults(suiteName: UserDefaultSuiteName)!.bool(forKey: "simple loop") ] ]
        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

}
