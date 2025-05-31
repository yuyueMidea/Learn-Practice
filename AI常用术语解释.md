**AI常用术语解释**

1. 大模型基础

| 术语/缩写 | 解释
|-----------|--------  
| LLM (Large Language Model) | 大语言模型，如GPT、DeepSeek等，用于文本生成和理解。
| NLP (Natural Language Processing) | 自然语言处理，AI 中处理文本和语言的领域。
| AGI (Artificial General Intelligence) | 通用人工智能，具备人类水平的广泛认知能力。 
| Transformer | 一种基于自注意力机制的神经网络架构（如GPT、BERT的核心）。
| GPT (Generative Pre-trained Transformer) | OpenAI 的生成式预训练模型系列（如GPT-4）。 
| MoE (Mixture of Experts) | 混合专家模型，将任务分配给不同子模型以提高效率（如DeepSeek-MoE）。

2.模型训练与优化

| 术语/缩写 | 解释
|-----------|--------
| Pretraining | 预训练：在大规模数据上训练模型学习通用表示。
| Finetuning | 微调：在特定任务上进一步调整预训练模型。
| RLHF (Reinforcement Learning from Human Feedback) | 基于人类反馈的强化学习，用于对齐模型行为（如ChatGPT的训练）。
| SFT (Supervised Fine-Tuning) | 监督微调：用标注数据调整模型输出。
| LoRA (Low-Rank Adaptation) | 低秩适配：高效微调大模型的技术，减少计算开销。
| PPO (Proximal Policy Optimization) | 近端策略优化，一种强化学习算法（用于RLHF）。

3. 模型架构与技术

| 术语/缩写 | 解释
|-----------|----
| Attention | 注意力机制：让模型聚焦输入的关键部分（Transformer的核心）。
| Self-Attention | 自注意力：序列内元素相互计算权重的机制。
| FFN (Feed-Forward Network) | 前馈网络：Transformer 中的全连接层。
| KV Cache (Key-Value Cache) | 缓存键值对，加速自回归生成（如文本续写）。
| RoPE (Rotary Positional Embedding) | 旋转位置编码，改进 Transformer 的长文本处理能力。

4. 评估与部署

| 术语/缩写 | 解释
|-----------|---- 
| BLEU (Bilingual Evaluation Understudy) | 评估机器翻译质量的指标。
| Rouge (Recall-Oriented Understudy for Gisting Evaluation) | 评估文本摘要质量的指标。 
| MMLU (Massive Multitask Language Understanding) | 多任务语言理解基准，测试模型通用能力。 
| Inference | 推理：模型对输入生成输出的过程。
| Quantization | 量化：降低模型权重精度以减少计算资源占用。

5. 硬件与计算

| 术语/缩写 | 解释
|-----------|------ 
| GPU (Graphics Processing Unit) | 图形处理器，加速深度学习计算。
| TPU (Tensor Processing Unit) | 谷歌专为张量计算设计的AI芯片。
| FLOPs (Floating Point Operations) | 浮点运算次数，衡量计算复杂度。
| HBM (High Bandwidth Memory) | 高带宽内存，用于大模型训练的高效数据存取。

6. DeepSeek 相关

| 术语/缩写 | 解释 
|-----------|---- 
| DeepSeek-MoE | DeepSeek 的混合专家模型，动态激活参数提升效率。
| DeepSeek-Coder | DeepSeek 的代码生成大模型。

7. 训练流程与优化

| 术语/缩写 | 解释
|-----------|------
| Curriculum Learning | 课程学习：按难度逐步训练模型（如先学简单样本，再学复杂样本）。
| Gradient Clipping | 梯度裁剪：限制梯度值，防止训练不稳定（避免梯度爆炸）。
| Warmup Steps | 学习率预热：训练初期逐步增加学习率，避免早期震荡。
| Batch Norm (Batch Normalization) | 批归一化：标准化每层输入，加速训练收敛。
| Gradient Checkpointing | 梯度检查点：用计算换内存，减少显存占用（适合大模型训练）。
| Megatron-LM | 一种分布式训练框架（由NVIDIA开发，用于高效训练LLM）。

8. 训练理论与数学  
| 术语/缩写 | 解释 |  
|--------------|---------|  
| Loss Landscape | 损失景观：模型参数空间中的损失函数形状，影响优化难度。 |  
| SGD (Stochastic Gradient Descent) | 随机梯度下降：基础优化算法，通过小批量数据更新参数。 |  
| AdamW | Adam优化器的改进版，解耦权重衰减（更稳定的训练）。 |  
| Sharpness-Aware Minimization (SAM) | 锐度感知最小化：优化损失景观的平坦性，提升泛化能力。 |  
| Neural Tangent Kernel (NTK) | 神经正切核：描述无限宽神经网络的训练动力学理论。 |  
| Grokk | 模型从“记忆”到“理解”的突然转变现象（如某些数学任务）。 |  

---

9. 模型思考与认知理论
   
| 术语/缩写 | 解释
|-----------|------- 
| Chain-of-Thought (CoT) | 思维链：让模型分步推理，提升复杂问题解答能力。
| System 1/System 2 Thinking | 双系统思维理论（System 1快思考/System 2慢思考），类比模型推理模式。
| Emergent Abilities | 涌现能力：模型规模增大时突然出现的新能力（如上下文学习）。
| Scaling Laws | 缩放定律：模型性能与数据/参数规模之间的幂律关系。
| Inductive Bias | 归纳偏置：模型设计中对解空间的隐含假设（如CNN的局部性偏好）。
| In-Context Learning (ICL) | 上下文学习：通过提示（prompt）让模型学习任务，无需微调。


10. 分布式与高效训练

| 术语/缩写 | 解释 
|-----------|----
| ZeRO (Zero Redundancy Optimizer) | 零冗余优化器（DeepSpeed框架技术），减少显存占用。
| Pipeline Parallelism | 流水线并行：将模型层拆分到不同设备，按阶段计算。
| Tensor Parallelism | 张量并行：将矩阵运算拆分到多个设备（如Megatron-LM）。
| Activation Checkpointing | 激活检查点：只保存部分中间结果，反向传播时重新计算。
| Flash Attention | 高效注意力计算算法，优化显存和速度。


11. 其他关键概念

| 术语/缩写 | 解释
|-----------|---
| Catastrophic Forgetting | 灾难性遗忘：模型在新任务上训练后遗忘旧任务知识。
| Sparsity | 稀疏性：通过剪枝或MoE减少激活参数，提升效率。
| Latent Space | 潜在空间：模型内部的高维表示（如生成模型的隐变量空间）。
| Teacher Forcing | 教师强制：训练时使用真实标签而非模型预测（用于序列生成）。

附：常见工具/库 

- PyTorch：Meta 开源的深度学习框架。  
- Hugging Face：提供预训练模型和数据集的开源平台。  
- vLLM：高效大模型推理框架。  
- PAC Learning (Probably Approximately Correct)：计算学习理论框架。  
- Bayesian Neural Networks：贝叶斯神经网络，引入参数不确定性。  
