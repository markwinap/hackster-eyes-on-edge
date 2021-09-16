# Edge Impulse - OpenMV Image Classification Example

import sensor, image, time, os, tf, network, socket, ubinascii, ujson
from pyb import UART
from mqtt import MQTTClient

sensor.reset()                         # Reset and initialize the sensor.
sensor.set_pixformat(sensor.GRAYSCALE)    # Set pixel format to RGB565 (or GRAYSCALE)
sensor.set_framesize(sensor.QVGA)      # Set frame size to QVGA (320x240)
sensor.set_windowing((240, 240))       # Set 240x240 window.
sensor.skip_frames(time=2000)          # Let the camera adjust.


# WIFI Network Info
SSID='YOUR_WIFI_SID' # Network SSID
KEY='YOUR_WIFI_PSW'  # Network key

# MQTT Server Info
PORT = 1883 # MQTT Default Port
HOST = "192.168.3.3" # MQTT Local Server

# TensorFlow Lite Model Path
path = "trained.tflite"

# Init wlan module and connect to network
print("Trying to connect. Note this may take a while...")

wlan = network.WLAN(network.STA_IF)
wlan.deinit()
wlan.active(True)
wlan.connect(SSID, KEY, timeout=30000)

# We should have a valid IP now via DHCP
print("WiFi Connected ", wlan.ifconfig())

# Get addr info via DNS
addr = socket.getaddrinfo(HOST, PORT)[0][4]
print(addr)

time.sleep_ms(1000)

## Connect To MQTT Broker
client = MQTTClient("openmv", HOST, port=PORT)
client.connect()

## Read Labels
labels = [line.rstrip('\n') for line in open("labels.txt")]
uart = UART(1, 9600)
clock = time.clock()


while(True):
    clock.tick()

    # Take snapshow and roate image 270 degrees
    img = sensor.snapshot().rotation_corr(z_rotation=270)

    # default settings just do one detection... change them to search the image...
    # tf.classify(path, img[, roi[, min_scale=1.0[, scale_mul=0.5[, x_overlap=0[, y_overlap=0]]]]])
    # https://docs.openmv.io/library/omv.tf.html?highlight=tf%20classify#tf.tf.classify
    # path - path to a .tflite
    # roi - region-of-interest rectangle tuple
    # min_scale - controls how much scaling is applied to the network
    # scale_mul - controls how many different scales are tested out
    # x_overlap - ontrols the percentage of overlap with the next detector area of the sliding window
    # y_overlap - controls the percentage of overlap with the next detector area of the sliding window
    for obj in tf.classify(path, img, min_scale=1.0, scale_mul=0.8, x_overlap=0.5, y_overlap=0.5):
        print("**********\nPredictions at [x=%d,y=%d,w=%d,h=%d]" % obj.rect())
        img.draw_rectangle(obj.rect())
        # This combines the labels and confidence values into a list of tuples
        predictions_list = list(zip(labels, obj.output()))

        # Get predictions score
        dog = predictions_list[0][1]
        leash = predictions_list[1][1]
        # If dog predition is > 70%
        if dog > 0.7:
            print("Found Dog")
            # Trigger Audio Alert
            # uart.write("PALERT   OGG\n")
            try:
                # Get iamge then compress it to make it smaller
                base64_data = ubinascii.b2a_base64(img.compress(quality=80))
                obj = {'data': base64_data, 'score': dog}
                # Send MQTT message with base64 image and prediction score
                client.publish("openmv/dog", ujson.dumps(obj))
            except OSError as e:
                print("socket error: ", e)
            # Prevent from sending too many requests
            time.sleep_ms(3000)
        # Print predictions and labels
        for i in range(len(predictions_list)):
            print("%s = %f" % (predictions_list[i][0], predictions_list[i][1]))
    print(clock.fps(), "fps")

