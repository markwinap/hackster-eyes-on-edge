
## Wget
https://eternallybored.org/misc/wget/
### Latest Windows 64 Version
https://eternallybored.org/misc/wget/1.21.1/64/wget.exe

## Protocol Buffers (protoc)
https://developers.google.com/protocol-buffers/docs/downloads
### Latest Windows Version
https://github.com/protocolbuffers/protobuf/releases/download/v3.17.3/protoc-3.17.3-win64.zip


## Python
https://www.python.org/downloads/
### Latest Version 64
https://www.python.org/ftp/python/3.9.6/python-3.9.6-amd64.exe

## Miniconda
https://docs.conda.io/en/latest/miniconda.html
### Latest Version x86 64
https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

### Create Enviroment
conda create --name ENVNAME python=3
conda activate ENVNAME


## Jupyter Notebook
https://jupyter.org/install.html

conda install -c conda-forge jupyterlab
conda install -c conda-forge notebook
conda install -c conda-forge voila

## Tensorflow
https://www.tensorflow.org/install/pip
pip install --upgrade tensorflow
### Test the installation.
python -c "import tensorflow as tf;print(tf.reduce_sum(tf.random.normal([1000, 1000])))"

## labelImg
https://github.com/tzutalin/labelImg

git clone https://github.com/tzutalin/labelImg.git
cd labelImg
conda install pyqt=5
conda install -c anaconda lxml
pyrcc5 -o libs/resources.py resources.qrc
python labelImg.py

## Models Tensorflow
git clone https://github.com/tensorflow/models.git
cd models/research
### Compile protos.
protoc object_detection/protos/*.proto --python_out=.
### Install TensorFlow Object Detection API.
cp object_detection/packages/tf2/setup.py .
python -m pip install --use-feature=2020-resolver .
### Test the installation.
python object_detection/builders/model_builder_tf2_test.py


## Download COCO dataset
mkdir coco
cd coco
mkdir images
cd images

### Download Files
wget -c http://images.cocodataset.org/zips/train2017.zip
wget -c http://images.cocodataset.org/zips/val2017.zip
wget -c http://images.cocodataset.org/zips/test2017.zip
wget -c http://images.cocodataset.org/zips/unlabeled2017.zip

### Unzip files
tar -xf train2017.zip
tar -xf val2017.zip
tar -xf test2017.zip
tar -xf unlabeled2017.zip

### Delete Zip files
del /f train2017.zip
del /f val2017.zip
del /f test2017.zip
del /f unlabeled2017.zip


cd ../
wget -c http://images.cocodataset.org/annotations/annotations_trainval2017.zip
wget -c http://images.cocodataset.org/annotations/stuff_annotations_trainval2017.zip
wget -c http://images.cocodataset.org/annotations/image_info_test2017.zip
wget -c http://images.cocodataset.org/annotations/image_info_unlabeled2017.zip

### Unzip files
tar -xf annotations_trainval2017.zip
tar -xf stuff_annotations_trainval2017.zip
tar -xf image_info_test2017.zip
tar -xf image_info_unlabeled2017.zip

### Delete Zip files
del /f train2017.zip
del /f val2017.zip
del /f test2017.zip
del /f unlabeled2017.zip



MIP


                                                                                                    
                     .......................
                     +                     +
                     +                     +
        VTref        +      1       2      +       SWDIO/TMS
                     +                     +
        GND          +      3       4      +       SWCLK/TCK
                     +                     +
        GND          +      5       6      +       SWO/TDO
                     +                     +
        KEY          +      7       8      +       TDI
                     +                     +
        GND        +      9         10     +       nReset
                   +                       +
        TgtPwr     +      11        12     +       TRACECLK
                     +                     +
        TgtPwr       +      13      14     +       TRACEDATA[0]
                     +                     +
        GND          +      15      16     +       TRACEDATA[1]
                     +                     +
        GND          +      17      18     +       TRACEDATA[2]
                     +                     +
        GND          +      19      20     +       TRACEDATA[3]
                     +                     +
                     +                     +
                     -----------------------                                     
                                                                                                    