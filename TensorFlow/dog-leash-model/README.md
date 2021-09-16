https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/training.html


python generate_tfrecord.py -x D:/ML/workspace/training_dog/images/train -l D:/ML/workspace/training_dog/annotations/label_map.pbtxt -o D:/ML/workspace/training_dog/annotations/train.record

python generate_tfrecord.py -x D:/ML/workspace/training_dog/images/test -l D:/ML/workspace/training_dog/annotations/label_map.pbtxt -o D:/ML/workspace/training_dog/annotations/test.record



python model_main_tf2.py --model_dir=models/my_ssd --pipeline_config_path=models/my_ssd/pipeline.config


python model_main_tf2.py --model_dir=models/my_ssd_resnet50_v1_fpn --pipeline_config_path=models/my_ssd_resnet50_v1_fpn/pipeline.config




### Train Model
python model_main_tf2.py --model_dir=models/my_ssd --pipeline_config_path=models/my_ssd/pipeline.config


https://tensorflow-object-detection-api-tutorial.readthedocs.io/en/latest/training.html

### Monitor Training Job Progress using TensorBoard
tensorboard --logdir=models/my_ssd


### Exporting a Trained Model
python .\exporter_main_v2.py --input_type image_tensor --pipeline_config_path .\models\my_ssd\pipeline.config --trained_checkpoint_dir .\models\my_ssd\ --output_directory .\exported-models\my_model


### CUDA ENV

<INSTALL_PATH>\NVIDIA GPU Computing Toolkit\CUDA\v11.4\bin

C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.4\bin

<INSTALL_PATH>\NVIDIA GPU Computing Toolkit\CUDA\v11.4\libnvvp
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.4\libnvvp

<INSTALL_PATH>\NVIDIA GPU Computing Toolkit\CUDA\v11.4\include
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.4\include

<INSTALL_PATH>\NVIDIA GPU Computing Toolkit\CUDA\v11.4\extras\CUPTI\lib64
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.4\extras\CUPTI\lib64

<INSTALL_PATH>\NVIDIA GPU Computing Toolkit\CUDA\v11.4\cuda\bin
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.4\cuda\bin

##
jupyter notebook



python .\train_image_classifier.py
--train_dir=vww_96_grayscale \
--dataset_name=visualwakewords \
--dataset_split_name=train \
--dataset_dir=annotations \
--model_name=mobilenet_v1_025 \
--preprocessing_name=mobilenet_v1 \
--train_image_size=96 \
--input_grayscale=True \
--save_summaries_secs=300 \
--learning_rate=0.045 \
--label_smoothing=0.1 \
--learning_rate_decay_factor=0.98 \
--num_epochs_per_decay=2.5 \
--moving_average_decay=0.9999 \
--batch_size=96 \
--max_number_of_steps=1000000




python models/research/slim/datasets/build_visualwakewords_data.py --logtostderr --train_image_dir=coco/raw-data/train2014 --val_image_dir=coco/raw-data/val2014 --train_annotations_file=coco/raw-data/annotations/instances_train2014.json --val_annotations_file=coco/raw-data/annotations/instances_val2014.json --output_dir=coco/processed --small_object_area_threshold=0.005 --foreground_class_of_interest='person'



## Edge Impulse

### CLI Image Uploader
https://docs.edgeimpulse.com/docs/cli-uploader

ei_b496ae025872150ec275013249cc00121a34b8e349fbc1a2



ei_018fa3ae24336b34374e5486cfb169877770ce54de5d939d


edge-impulse-uploader --api-key ei_018fa3ae24336b34374e5486cfb169877770ce54de5d939d images/*.jpeg


edge-impulse-uploader --api-key ei_018fa3ae24336b34374e5486cfb169877770ce54de5d939d --format-openmv dog-leash/


### Add to path linux

export PATH=/home/dave/work:$PATH

export PATH=/home/cloudlov/Documents/gcc-arm-none-eabi-10.3-2021.07/bin:$PATH

### Permanent edit
gedit .bashrc
ADdd
export PATH=/home/cloudlov/Documents/gcc-arm-none-eabi-10.3-2021.07/bin:$PATH



wget https://developer.download.nvidia.com/compute/cuda/repos/${OS}/x86_64/cuda-${OS}.pin 

sudo mv cuda-${OS}.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/${OS}/x86_64/7fa2af80.pub
sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/${OS}/x86_64/ /"
sudo apt-get update


wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin 

sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/7fa2af80.pub
sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/ /"
sudo apt-get update



sudo apt-get install libcudnn8=8.2.2.*-1+cuda11.4
sudo apt-get install libcudnn8-dev=8.2.2.*-1+cuda11.4


Test

cp -r /usr/src/cudnn_samples_v8/ $HOME
cd  $HOME/cudnn_samples_v8/mnistCUDNN
make clean && make
./mnistCUDNN





python3 -c "import tensorflow as tf;print(tf.reduce_sum(tf.random.normal([1000, 1000])))"





cudnn-11.4-linux-x64-v8.2.2.26.tgz





sudo cp cuda/include/cudnn*.h /usr/local/cuda/include 
sudo cp -P cuda/lib64/libcudnn* /usr/local/cuda/lib64 
sudo chmod a+r /usr/local/cuda/include/cudnn*.h /usr/local/cuda/lib64/libcudnn*






# CUDA related exports
export PATH=/usr/local/cuda-11.4/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=/usr/local/cuda-11.4/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}




export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda/extras/CUPTI/lib64




######################### CUDA TOOLKIT
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin

sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600

wget https://developer.download.nvidia.com/compute/cuda/11.4.1/local_installers/cuda-repo-ubuntu2004-11-4-local_11.4.1-470.57.02-1_amd64.deb

sudo dpkg -i cuda-repo-ubuntu2004-11-4-local_11.4.1-470.57.02-1_amd64.deb

sudo apt-key add /var/cuda-repo-ubuntu2004-11-4-local/7fa2af80.pub

sudo apt-get update

sudo apt-get -y install cuda


sudo dpkg -i libcudnn8_x.x.x-1+cuda11.4_amd64.deb
sudo dpkg -i libcudnn8-dev_8.x.x.x-1+cuda11.4_amd64.deb
sudo dpkg -i libcudnn8-samples_8.x.x.x-1+cuda11.4_amd64.deb

