import UIKit
import WebKit

class ViewController: UIViewController {
                            
    var webView: UIWebView?
    
    override func loadView() {
        super.loadView()
        self.webView = UIWebView()
        self.view = self.webView
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let url = NSURL(string: "http://ontouchstart.github.io/sandbox/HappyBirthday/#Sam")
        let req = NSURLRequest(URL: url)
        self.webView!.loadRequest(req)
    }


}

