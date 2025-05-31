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
