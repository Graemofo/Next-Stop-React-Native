#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <GoogleMaps/GoogleMaps.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
GMSServices provideAPIKey:@"AIzaSyDQZV9qz4b5pj6PeD361ntTnxx6zZQbSlc"]; // add this line using the api key obtained from Google Console
@property (nonatomic, strong) UIWindow *window;

@end
