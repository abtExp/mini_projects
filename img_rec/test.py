import numpy as np
import random

class Network:
    def __init__(self,net_config,cost=cross_entropy):
        self.net_config = net_config
        self.lyrs_count = net_config.len
        self.weigths = [np.random.randn(y,x) for x,y in zip(sizes[:-1],net_config[1:])]
        self.biases = [np.random.randn(y,1) for y in net_config[1:]]



    def feed_forward(self,x):
        for b,w in zip(self.weights,self.biases):
            x = sigmoid(np.dot(w,a)+b)

        return x


    def SGD(self,epoch=100,neta=0.5,m=10):
        
